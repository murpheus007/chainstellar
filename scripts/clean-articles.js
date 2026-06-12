#!/usr/bin/env node
/**
 * clean-articles.js
 * Gently cleans HTML in blog markdown files.
 * Only removes specific known UI elements, preserves all content.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const BLOG_DIR = join(process.cwd(), 'src/content/blog');

const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = join(BLOG_DIR, file);
  let content = readFileSync(filePath, 'utf-8');
  
  // Extract frontmatter and body
  const fmMatch = content.match(/^---([\s\S]+?)---\n([\s\S]*)$/);
  if (!fmMatch) continue;
  
  const frontmatter = fmMatch[1];
  let body = fmMatch[2].trim();
  
  // Gentle cleaning: only remove elements that are purely UI/decorative
  // 1. Substack header anchor link button (the copy-link button inside headings)
  body = body.replace(/<div[^>]*class="[^"]*header-anchor-parent[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, '');
  
  // 2. Remove Substack footnote anchor spans but keep the number
  body = body.replace(/<a[^>]*class="[^"]*footnote-anchor[^"]*"[^>]*>(\d+)<\/a>/gi, '<sup>$1</sup>');
  
  // 3. Remove empty data-state spans (Substack wraps footnotes in these)
  body = body.replace(/<span[^>]*data-state[^>]*>([^<]*)<\/span>/gi, '$1');
  
  // 4. Remove button elements (UI only, no content)
  body = body.replace(/<button[^>]*>[\s\S]*?<\/button>/gi, '');
  
  // 5. Remove SVG elements (icons)
  body = body.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  
  // 6. Remove picture/source (keep img which is inside)
  body = body.replace(/<picture[^>]*>/gi, '').replace(/<\/picture>/gi, '').replace(/<source[^>]*>/gi, '');
  
  // 7. Simplify image tags: remove all attrs except src and alt
  body = body.replace(/<img\s+([^>]*)>/gi, (match, attrs) => {
    const src = attrs.match(/src="([^"]*)"/)?.[1] || '';
    const alt = attrs.match(/alt="([^"]*)"/)?.[1] || '';
    return `<img src="${src}" alt="${alt}">`;
  });
  
  // 8. Simplify Links: remove all attrs except href  
  body = body.replace(/<a\s+([^>]*)>/gi, (match, attrs) => {
    const href = attrs.match(/href="([^"]*)"/)?.[1] || '';
    return `<a href="${href}">`;
  });

  // 9. Remove empty class spans (Substack wraps text in spans with classes)
  body = body.replace(/<span[^>]*class="[^"]*"[^>]*>([^<]*)<\/span>/gi, '$1');
  
  // Clean up whitespace
  body = body.replace(/\n{3,}/g, '\n\n').trim();
  
  // Reconstruct
  const cleaned = `---\n${frontmatter}\n---\n\n${body}`;
  writeFileSync(filePath, cleaned, 'utf-8');
  console.log(`✅ Cleaned: ${file}`);
}

console.log(`\nDone! ${files.length} files cleaned.`);
