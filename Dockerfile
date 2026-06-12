# Stage 1: Build
FROM node:lts-alpine AS builder
WORKDIR /app

# Site URL for SEO/Sitemap generation
ARG SITE_URL
ENV SITE_URL=$SITE_URL

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: High-Performance Serve
FROM nginx:alpine AS runner

# Create a custom Nginx config to listen on 4321 instead of 80
RUN echo 'server { \
    listen 4321; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    error_page 404 /404.html; \
}' > /etc/nginx/conf.d/default.conf

# Copy only the compiled static files from the builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 4321

# Nginx runs in the foreground by default in this image
CMD ["nginx", "-g", "daemon off;"]