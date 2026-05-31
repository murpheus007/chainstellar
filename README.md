# Chainstellar

[![Live](https://img.shields.io/badge/Live-chainstellar.site-green.svg)](https://chainstellar.site)
[![Stack](https://img.shields.io/badge/Stack-Astro%20%7C%20React%20%7C%20Docker-blue.svg)](#tech-stack)

Portfolio website for Damian D. Chidera — deployed as a Docker container with Nginx on a production VPS.

## Tech Stack

- **Framework:** Astro with React islands
- **Styling:** TailwindCSS
- **Deployment:** Docker Compose, Nginx reverse proxy
- **SEO:** Structured data (Person schema), optimized meta tags, sitemap

## Live Site

[https://chainstellar.site](https://chainstellar.site)

## Deployment

```bash
git clone https://github.com/murpheus007/chainstellar.git
cd chainstellar
cp .env.example .env
docker compose up -d
```

## Features

- Responsive design with dark/light theme toggle
- SEO-optimized with structured data markup
- Fast load times via Astro's static generation + React interactivity
- Production deployment via Docker + Nginx

## License

MIT
