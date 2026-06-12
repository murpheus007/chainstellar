#!/usr/bin/env node
/**
 * fetch-twitter-threads.js
 * 
 * Fetches Twitter/X thread content using the public Syndication API.
 * No auth required — works for any public tweet/thread.
 * 
 * Usage: node scripts/fetch-twitter-threads.js
 * 
 * Reads Twitter URLs from src/static/works.js, fetches each thread,
 * and outputs markdown files to src/content/blog/ with images.
 */

import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'src/content/blog');
const IMG_DIR = join(ROOT, 'public/images/blog');
const WORKS_FILE = join(ROOT, 'src/static/works.js');

// ── Helpers ──────────────────────────────────────────────────────────────────

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        httpsGet(res.headers.location).then(resolve).catch(reject);
        return;
      }
      let chunks = '';
      res.on('data', d => chunks += d);
      res.on('end', () => resolve(chunks));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function slugify(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function stripHtml(str) {
  return str.replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ').trim();
}

function extractTweetId(url) {
  // Match patterns like x.com/.../status/123456 or twitter.com/.../status/123456
  const match = url.match(/status\/(\d+)/);
  return match ? match[1] : null;
}

function extractImageUrls(tweetData) {
  const seen = new Set();
  const urls = [];
  for (const m of (tweetData.mediaDetails || [])) {
    if (m.media_url_https && !seen.has(m.media_url_https)) {
      seen.add(m.media_url_https);
      urls.push(m.media_url_https);
    }
  }
  for (const p of (tweetData.photos || [])) {
    if (p.url && !seen.has(p.url)) {
      seen.add(p.url);
      urls.push(p.url);
    }
  }
  return urls;
}

// ── Fetch a single tweet ─────────────────────────────────────────────────────

async function fetchTweet(tweetId) {
  const url = `https://cdn.syndication.twimg.com/tweet-result?id=${tweetId}&token=0`;
  const body = await httpsGet(url);
  return JSON.parse(body);
}

// ── Fetch an entire thread ───────────────────────────────────────────────────

async function fetchThread(firstTweetId) {
  // Fetch the first tweet via syndication API
  const first = await fetchTweet(firstTweetId);
  if (!first || !first.id_str) {
    throw new Error(`Could not fetch tweet ${firstTweetId}`);
  }
  
  const author = first.user?.screen_name;
  const tweets = [first];
  const visited = new Set([firstTweetId]);
  
  // Strategy: Try to find thread replies from the author's timeline.
  // This works for recent threads (within the last ~93 tweets).
  // For older threads, we rely on the individual tweet's reply chain.
  
  try {
    const timelineUrl = `https://syndication.twitter.com/srv/timeline-profile/screen-name/${author}?dnt=true&embedId=twitter-widget-0&frame=false&hideBorder=true&hideFooter=true&hideHeader=true&hideScrollBar=true&lang=en&origin=https%3A%2F%2Fx.com&showHeader=false&showReplies=false&transparent=false`;
    
    const timelineHtml = await httpsGet(timelineUrl);
    const match = timelineHtml.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]+?)<\/script>/);
    
    if (match) {
      const data = JSON.parse(match.group(1));
      const entries = data?.props?.pageProps?.timeline?.entries || [];
      
      // Build a map of all tweets by this author in the timeline
      const authorTweets = new Map();
      for (const entry of entries) {
        const tweet = entry?.content?.tweet;
        if (tweet && tweet.id_str && tweet.user?.screen_name === author) {
          authorTweets.set(tweet.id_str, tweet);
        }
      }
      
      // BFS: find all tweets in the thread by following reply chains
      const queue = [firstTweetId];
      while (queue.length > 0) {
        const currentId = queue.shift();
        
        // Find all tweets from the author that reply to currentId
        for (const [id, tweet] of authorTweets) {
          if (visited.has(id)) continue;
          if (tweet.in_reply_to_status_id_str === currentId) {
            tweets.push(tweet);
            visited.add(id);
            queue.push(id);
          }
        }
      }
      
      // Order the tweets by following the reply chain
      const ordered = [first];
      const used = new Set([firstTweetId]);
      
      let progress = true;
      while (progress) {
        progress = false;
        for (const t of tweets) {
          if (used.has(t.id_str)) continue;
          for (const o of ordered) {
            if (t.in_reply_to_status_id_str === o.id_str) {
              ordered.push(t);
              used.add(t.id_str);
              progress = true;
              break;
            }
          }
        }
      }
      
      // Add any remaining tweets by creation time
      if (ordered.length < tweets.length) {
        const remaining = tweets.filter(t => !used.has(t.id_str));
        remaining.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        ordered.push(...remaining);
      }
      
      if (ordered.length > 1) return ordered;
    }
  } catch (e) {
    // Timeline fetch failed, return just the first tweet
  }
  
  return [first];
}

// ── Download image ───────────────────────────────────────────────────────────

async function downloadImage(url, destPath) {
  if (existsSync(destPath)) return true;
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      const chunks = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        writeFileSync(destPath, buf);
        resolve(true);
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// ── Generate markdown ────────────────────────────────────────────────────────

function generateThreadMarkdown(tweets, slug, work) {
  const firstTweet = tweets[0];
  const date = firstTweet.created_at 
    ? new Date(firstTweet.created_at).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);
  
  // Build HTML content
  let htmlContent = '<div class="twitter-thread">';
  let globalImgIndex = 0;
  
  for (let i = 0; i < tweets.length; i++) {
    const t = tweets[i];
    const text = t.text || '';
    const images = extractImageUrls(t);
    
    htmlContent += `<div class="tweet" data-tweet-index="${i + 1}">`;
    htmlContent += `<p class="tweet-text">${text.replace(/\n/g, '<br/>')}</p>`;
    
    let tweetImgIndex = 0;
    for (const imgUrl of images) {
      globalImgIndex++;
      tweetImgIndex++;
      const imgName = `${slug}-tweet${i + 1}-${tweetImgIndex}.jpg`;
      htmlContent += `<figure><img src="/images/blog/${imgName}" alt="Tweet image" loading="lazy"/><figcaption>Tweet ${i + 1}</figcaption></figure>`;
    }
    
    htmlContent += '</div>';
    
    if (i < tweets.length - 1) {
      htmlContent += '<div class="thread-connector"><span>↓</span></div>';
    }
  }
  
  htmlContent += '</div>';
  
  // Frontmatter
  const fm = [
    `title: "${work.title}"`,
    `description: "${work.description}"`,
    `platform: "X/Twitter"`,
    `originalUrl: "${work.link}"`,
    `image: "${work.image}"`,
    `publishedDate: "${date}"`,
    `slug: "${slug}"`,
    `tweetCount: ${tweets.length}`,
  ].join('\n');
  
  return `---\n${fm}\n---\n\n${htmlContent}`;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🐦 Twitter Thread Fetcher\n');
  
  mkdirSync(BLOG_DIR, { recursive: true });
  mkdirSync(IMG_DIR, { recursive: true });
  
  // Read works
  const worksMod = await import(WORKS_FILE + '?t=' + Date.now());
  const works = worksMod.works;
  
  // Filter Twitter/X works
  const twitterWorks = works.filter(w => 
    w.link.includes('x.com') || w.link.includes('twitter.com')
  );
  
  console.log(`Found ${twitterWorks.length} Twitter works\n`);
  
  let fetched = 0, failed = 0;
  
  for (const work of twitterWorks) {
    const slug = slugify(work.title);
    const mdPath = join(BLOG_DIR, `${slug}.md`);
    
    // Skip if already fetched
    if (existsSync(mdPath)) {
      console.log(`  ⏭️  Already exists: ${work.title}`);
      continue;
    }
    
    console.log(`\n📄 Fetching thread: ${work.title}`);
    
    try {
      let tweets = [];
      
      // If threadLinks is provided, fetch each tweet directly
      if (work.threadLinks && work.threadLinks.length > 0) {
        console.log(`   Thread has ${work.threadLinks.length} tweets`);
        for (const url of work.threadLinks) {
          const tid = extractTweetId(url);
          if (tid) {
            const tweet = await fetchTweet(tid);
            if (tweet) tweets.push(tweet);
          }
        }
      } else {
        // Fallback: fetch just the first tweet
        const tweetId = extractTweetId(work.link);
        if (!tweetId) {
          console.log(`  ⚠️ Could not extract tweet ID from: ${work.link}`);
          failed++;
          continue;
        }
        console.log(`   Tweet ID: ${tweetId}`);
        tweets = await fetchThread(tweetId);
      }
      
      if (tweets.length === 0) {
        console.log(`  ❌ No tweets found`);
        failed++;
        continue;
      }
      
      console.log(`   ✅ Found ${tweets.length} tweet(s)`);
      
      // Download images
      for (let i = 0; i < tweets.length; i++) {
        const images = extractImageUrls(tweets[i]);
        for (let j = 0; j < images.length; j++) {
          const imgName = `${slug}-tweet${i + 1}-${j + 1}.jpg`;
          const imgPath = join(IMG_DIR, imgName);
          try {
            await downloadImage(images[j], imgPath);
            console.log(`   🖼️  Image downloaded: ${imgName}`);
          } catch (e) {
            console.log(`   ⚠️ Image failed: ${e.message}`);
          }
        }
      }
      
      // Generate markdown
      const md = generateThreadMarkdown(tweets, slug, work);
      writeFileSync(mdPath, md, 'utf-8');
      console.log(`   📝 Saved: ${slug}.md`);
      
      fetched++;
    } catch (err) {
      console.log(`   ❌ Failed: ${err.message}`);
      failed++;
    }
    
    await sleep(1500); // rate limiting
  }
  
  console.log(`\n\n───────────────────────────────────────`);
  console.log(`✅ Done! ${fetched} threads fetched, ${failed} failed`);
  console.log(`📁 Blog posts: ${BLOG_DIR}`);
  console.log(`📁 Images:     ${IMG_DIR}`);
}

main().catch((err) => {
  console.error('❌ Fatal:', err);
  process.exit(1);
});
