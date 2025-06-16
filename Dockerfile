# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the entire source code
COPY . .

# Build the Astro project
RUN npm run build

# Install Gzip
RUN apk add --no-cache gzip

RUN find /app/dist -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.json" -o -name "*.svg" -o -name "*.txt" \) -exec gzip -k -9 {} \;

# Production stage (serving static files)
FROM nginx:alpine AS runner

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .

COPY nginx.conf /etc/nginx/nginx.conf

# Expose the correct port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
