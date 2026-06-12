#!/usr/bin/env node
/**
 * fetch-articles.js
 * 
 * Fetches article content and images from Substack and Medium links
 * defined in src/static/works.js. Outputs markdown files with frontmatter
 * and downloaded images for use in the Chainstellar blog section.
 * 
 * Output:
 *   src/content/blog/       — markdown files with frontmatter
 *   public/images/blog/     — downloaded article images
 *   src/static/blogIndex.js  — generated index for the blog page
 * 
 * Usage: node scripts/fetch-articles.js
 */

import { mkdirSync, writeFileSync, existsSync, readFileSync, createWriteStream } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';
import http from 'node:http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'src/content/blog');
const IMG_DIR = join(ROOT, 'public/images/blog');
const WORKS_FILE = join(ROOT, 'src/static/works.js');

// ── Substack scraping ────────────────────────────────────────────────────────

async function fetchHTML(url, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const body = await httpGet(url, {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      });
      return body;
    } catch (err) {
      if (i === retries) throw err;
      await sleep(2000 * (i + 1));
    }
  }
}

function httpGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) {
          const parsed = new URL(url);
          redirectUrl = `${parsed.protocol}//${parsed.host}${redirectUrl}`;
        }
        httpGet(redirectUrl, headers).then(resolve).catch(reject);
        return;
      }
      let chunks = '';
      res.on('data', d => chunks += d);
      res.on('end', () => resolve(chunks));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function extractSubstackContent(html) {
  // Extract the article body from Substack HTML
  // Substack structure: <div class="available-content"> <div class="body markup"> ... </div> ... </div>

  // 1. Best: extract from available-content div (wraps full post body)
  //    Match everything between the opening tag and the post-footer/contributor-footer
  const availMatch = html.match(/<div[^>]*class="[^"]*available-content[^"]*"[^>]*>([\s\S]+?)(?=<div[^>]*class="[^"]*(?:post-footer|post-contributor-footer|comments-section))/);
  if (availMatch && availMatch[1].length > 500) {
    return { content: '<div class="body markup">' + cleanHtml(availMatch[1]) + '</div>', source: 'available-content' };
  }

  // 2. Fallback: body markup div
  const bodyMarkup = html.match(/<div[^>]*class="[^"]*body markup[^"]*"[^>]*>([\s\S]+?)(?=<div[^>]*class="[^"]*(?:post-footer|post-contributor-footer))/);
  if (bodyMarkup && bodyMarkup[1].length > 200) {
    return { content: cleanHtml(bodyMarkup[1]), source: 'body-markup' };
  }

  // 3. Fallback: JSON-LD structured data
  const jsonLdMatch = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]+?)<\/script>/g);
  if (jsonLdMatch) {
    for (const script of jsonLdMatch) {
      try {
        const json = JSON.parse(script.replace(/<[^>]+>/g, ''));
        if (json.articleBody) {
          return { content: json.articleBody, source: 'json-ld' };
        }
      } catch {}
    }
  }

  // 4. Fallback: article tag
  const articleMatch = html.match(/<article[^>]*>([\s\S]+?)<\/article>/);
  if (articleMatch) {
    return { content: cleanHtml(articleMatch[1]), source: 'article-tag' };
  }

  // 5. Fallback: main tag
  const mainMatch = html.match(/<main[^>]*>([\s\S]+?)<\/main>/);
  if (mainMatch) {
    return { content: cleanHtml(mainMatch[1]), source: 'main-tag' };
  }

  return { content: '', source: 'failed' };
}

function extractSubstackImage(html) {
  // Try og:image first
  const ogMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/);
  if (ogMatch) return ogMatch[1];
  
  // Try twitter:image
  const twMatch = html.match(/<meta[^>]*name="twitter:image"[^>]*content="([^"]+)"/);
  if (twMatch) return twMatch[1];

  // Try first large image in article
  const imgMatch = html.match(/<img[^>]*src="(https:\/\/substackcdn\.com\/image\/[^"]+)"/);
  if (imgMatch) return imgMatch[1];

  return null;
}

function extractSubstackTitle(html) {
  const ogMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/);
  if (ogMatch) return stripHtml(ogMatch[1]);
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (titleMatch) return stripHtml(titleMatch[1]).replace(/ \| .+$/, '');
  return '';
}

function extractSubstackDate(html) {
  const timeMatch = html.match(/<time[^>]*datetime="([^"]+)"/);
  if (timeMatch) return timeMatch[1].slice(0, 10);
  const metaMatch = html.match(/<meta[^>]*property="article:published_time"[^>]*content="([^"]+)"/);
  if (metaMatch) return metaMatch[1].slice(0, 10);
  const dateStr = new Date().toISOString().slice(0, 10);
  return dateStr;
}

function stripHtml(str) {
  return str.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
}

function cleanHtml(html) {
  // Remove Substack-specific UI elements
  let cleaned = html;
  
  // Remove subscribe buttons, paywalls, etc.
  cleaned = cleaned.replace(/<div[^>]*class="[^"]*(?:subscribe|paywall|modal|signup)[^"]*"[^>]*>[\s\S]+?<\/div>/gi, '');
  // Remove social share bars
  cleaned = cleaned.replace(/<div[^>]*class="[^"]*(?:share|social|ufi)[^"]*"[^>]*>[\s\S]+?<\/div>/gi, '');
  // Remove like/comment bars
  cleaned = cleaned.replace(/<div[^>]*class="[^"]*(?:post-footer|bottom-meta)[^"]*"[^>]*>[\s\S]+?<\/div>/gi, '');
  // Remove noscript tags
  cleaned = cleaned.replace(/<noscript[^>]*>[\s\S]+?<\/noscript>/gi, '');
  // Remove script tags
  cleaned = cleaned.replace(/<script[^>]*>[\s\S]+?<\/script>/gi, '');
  // Remove style tags
  cleaned = cleaned.replace(/<style[^>]*>[\s\S]+?<\/style>/gi, '');
  
  return cleaned.trim();
}

// ── Medium RSS fetching ──────────────────────────────────────────────────────

async function fetchMediumRSS(username) {
  const url = `https://medium.com/feed/@${username}`;
  try {
    const xml = await httpGet(url, {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      'Accept': 'application/rss+xml, application/xml, text/xml',
    });
    return xml;
  } catch (err) {
    console.log(`  ⚠️ Medium RSS fetch failed for @${username}: ${err.message}`);
    return null;
  }
}

function parseMediumRSS(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]+?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];
    const title = stripHtml(item.match(/<title><!\[CDATA\[(.+)\]\]><\/title>/)?.[1] || item.match(/<title>([^<]+)<\/title>/)?.[1] || '');
    const link = item.match(/<link>([^<]+)<\/link>/)?.[1]?.trim() || '';
    const pubDate = item.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1] || '';
    const description = item.match(/<description><!\[CDATA\[([\s\S]+?)\]\]><\/description>/)?.[1] || '';
    const contentEncoded = item.match(/<content:encoded><!\[CDATA\[([\s\S]+?)\]\]><\/content:encoded>/)?.[1] || '';
    const creator = item.match(/<dc:creator><!\[CDATA\[(.+)\]\]><\/dc:creator>/)?.[1] || '';
    
    // Extract image from content
    const imgMatch = (contentEncoded || description).match(/<img[^>]*src="([^"]+)"/);
    const image = imgMatch ? imgMatch[1] : null;
    
    // Clean the content
    const content = cleanMediumHtml(contentEncoded || description);
    
    // Generate slug from link
    const slug = link.split('/').pop()?.split('?')[0] || slugify(title);
    
    if (title && link) {
      items.push({
        title,
        link,
        pubDate: pubDate ? new Date(pubDate).toISOString().slice(0, 10) : '',
        content,
        image,
        creator: stripHtml(creator),
        slug,
      });
    }
  }
  return items;
}

function cleanMediumHtml(html) {
  if (!html) return '';
  let cleaned = html;
  // Remove Medium-specific elements
  cleaned = cleaned.replace(/<div[^>]*class="[^"]*(?:metabar|postActions|tweetComposer|paragraphControls)[^"]*"[^>]*>[\s\S]+?<\/div>/gi, '');
  cleaned = cleaned.replace(/<figure[^>]*class="[^"]*is-paragraph[^"]*"[^>]*>[\s\S]+?<\/figure>/gi, '');
  // Keep images and captions, remove other UI
  cleaned = cleaned.replace(/<script[^>]*>[\s\S]+?<\/script>/gi, '');
  cleaned = cleaned.replace(/<style[^>]*>[\s\S]+?<\/style>/gi, '');
  cleaned = cleaned.replace(/<noscript[^>]*>[\s\S]+?<\/noscript>/gi, '');
  cleaned = cleaned.replace(/data-src=/g, 'src='); // activate lazy-loaded images
  cleaned = cleaned.replace(/class="[^"]*graf--lazyImage[^"]*"/g, '');
  cleaned = cleaned.replace(/<a[^>]*class="[^"]*markup--anchor[^"]*"[^>]*>/g, '<a>').replace(/<\/a></g, '</a>');
  return cleaned.trim();
}

function slugify(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

// ── Image downloading ────────────────────────────────────────────────────────

async function downloadImage(url, destPath) {
  if (existsSync(destPath)) return true;
  try {
    const data = await httpGet(url, {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      'Referer': 'https://substack.com/',
    });
    // For binary images we need raw bytes, but httpGet returns string
    // Use a proper binary download
    await binaryDownload(url, destPath);
    return true;
  } catch (err) {
    console.log(`  ⚠️ Image download failed: ${err.message}`);
    return false;
  }
}

function binaryDownload(url, destPath) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      'Referer': 'https://substack.com/',
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        binaryDownload(res.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      const file = createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// ── Markdown generation ──────────────────────────────────────────────────────

function toMarkdown(frontmatter) {
  const fm = Object.entries(frontmatter)
    .map(([k, v]) => {
      if (Array.isArray(v)) return `${k}: [${v.map(x => `"${x}"`).join(', ')}]`;
      if (typeof v === 'string' && v.includes('\n')) return `${k}: |\n  ${v.replace(/\n/g, '\n  ')}`;
      return `${k}: "${v}"`;
    })
    .join('\n');
  
  return `---\n${fm}\n---\n\n`;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('📰 Chainstellar Article Fetcher\n');
  
  // Ensure directories exist
  mkdirSync(BLOG_DIR, { recursive: true });
  mkdirSync(IMG_DIR, { recursive: true });
  
  // Read works
  const worksMod = await import(WORKS_FILE + '?t=' + Date.now());
  const works = worksMod.works;
  
  console.log(`Found ${works.length} works\n`);
  
  const blogIndex = [];
  let fetched = 0, skipped = 0, failed = 0;
  
  for (const work of works) {
    const isSubstack = work.link.includes('substack.com');
    const isMedium = work.link.includes('medium.com');
    const isTwitter = work.link.includes('x.com') || work.link.includes('twitter.com');
    
    // Skip Twitter threads — they can't be embedded as articles
    if (isTwitter) {
      console.log(`  ⏭️  Skipping (Twitter): ${work.title}`);
      skipped++;
      continue;
    }

    const slug = slugify(work.title);
    const mdPath = join(BLOG_DIR, `${slug}.md`);
    const imgPath = join(IMG_DIR, `${slug}.jpg`);
    
    console.log(`\n📄 Fetching: ${work.title}`);
    console.log(`   URL: ${work.link}`);
    
    let content = '', imageUrl = null, publishedDate = '';
    
    if (isSubstack) {
      try {
        const html = await fetchHTML(work.link);
        const extracted = extractSubstackContent(html);
        content = extracted.content;
        imageUrl = extractSubstackImage(html);
        publishedDate = extractSubstackDate(html);
        console.log(`   ✅ Substack (${extracted.source}) — ${content.length} chars`);
      } catch (err) {
        console.log(`   ❌ Substack fetch failed: ${err.message}`);
        failed++;
        continue;
      }
    } else if (isMedium) {
      // Extract username from Medium URL
      const username = work.link.match(/medium\.com\/@([^/]+)/)?.[1];
      if (username) {
        const rssXml = await fetchMediumRSS(username);
        if (rssXml) {
          const articles = parseMediumRSS(rssXml);
          const article = articles.find((a) => a.link === work.link || work.link.includes(a.slug));
          if (article) {
            content = article.content;
            imageUrl = article.image;
            publishedDate = article.pubDate;
            console.log(`   ✅ Medium RSS — ${content.length} chars`);
          } else {
            console.log(`   ⚠️ Article not found in Medium RSS, using description`);
            content = work.description;
            failed++;
          }
        } else {
          console.log(`   ⚠️ Medium RSS failed, using description`);
          content = work.description;
          failed++;
        }
      }
    }
    
    // Download image
    let localImage = work.image; // fallback to existing image from works.js
    if (imageUrl) {
      const imgExt = imageUrl.match(/\.(png|jpe?g|gif|webp|avif)/i)?.[1] || 'jpg';
      const localImgPath = join(IMG_DIR, `${slug}.${imgExt}`);
      const ok = await downloadImage(imageUrl, localImgPath);
      if (ok) {
        localImage = `/images/blog/${slug}.${imgExt}`;
        console.log(`   🖼️  Image downloaded: ${localImage}`);
      }
    }
    
    // Build frontmatter
    const frontmatter = {
      title: work.title,
      description: work.description,
      platform: isSubstack ? 'Substack' : isMedium ? 'Medium' : 'Article',
      originalUrl: work.link,
      image: localImage,
      publishedDate: publishedDate || '',
      slug,
    };
    
    // Write markdown file
    const mdContent = toMarkdown(frontmatter) + content;
    writeFileSync(mdPath, mdContent, 'utf-8');
    
    blogIndex.push({
      slug,
      title: work.title,
      description: work.description,
      platform: frontmatter.platform,
      image: localImage,
      publishedDate: publishedDate || '',
    });
    
    fetched++;
    await sleep(1500); // rate limiting
  }
  
  // Write blog index
  const indexContent = `// Auto-generated by scripts/fetch-articles.js — do not edit manually\nexport const blogPosts = ${JSON.stringify(blogIndex, null, 2)};\n`;
  writeFileSync(join(ROOT, 'src/static/blogIndex.js'), indexContent, 'utf-8');
  
  console.log(`\n\n───────────────────────────────────────`);
  console.log(`✅ Done! ${fetched} articles fetched, ${skipped} skipped, ${failed} failed`);
  console.log(`📁 Blog posts: ${BLOG_DIR}`);
  console.log(`📁 Images:     ${IMG_DIR}`);
  console.log(`📝 Index:      src/static/blogIndex.js`);
}

main().catch((err) => {
  console.error('❌ Fatal:', err);
  process.exit(1);
});
