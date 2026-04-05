# Unique Next.js Skeleton

A premium multi-page business template built for **n8n -> GitHub -> Vercel** automation.

## What is included

- Multi-page site: Home, Services, About, Coverage, Contact
- Dynamic local area pages at `/areas/[slug]`
- **Variant-based layout system** so sites do not all look the same
- Theme switching via config
- Built-in image library folder structure for **royalty-free image packs**
- SEO metadata, robots and sitemap
- JSON-driven content via `site-config.json`

## Key idea

Your AI should generate **copy**.
Your workflow should choose **layout variants, themes and image packs**.

That makes each site feel unique while keeping quality stable.

## Important config blocks

### `layout`
Controls which section variants render on the homepage.

### `images`
Maps the image library used by the template.

## Recommended image workflow

Keep your curated royalty-free images inside:

```text
public/images/
  hero/
  about/
  services/
  logos/
```

Then let n8n inject the right paths into `site-config.json`.

## Suggested n8n logic

1. Generate business copy with AI
2. Parse and validate JSON
3. Pick industry image pack
4. Pick deterministic layout variants
5. Write `site-config.json`
6. Deploy

## Example image pack folders

```text
public/images/hero/plumbing-1.jpg
public/images/hero/plumbing-2.jpg
public/images/hero/electrician-1.jpg
public/images/about/plumbing-team-1.jpg
public/images/services/plumbing-emergency-1.jpg
```

## Recommended future improvements

- Add real JPG/WebP royalty-free assets into the image folders
- Add service pages for each `services[].slug`
- Add location + service landing pages for SEO scaling
- Add schema extensions for reviews / opening hours / geo
