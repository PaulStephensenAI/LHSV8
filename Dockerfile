# Multi-stage Dockerfile for Lavender Hill Studio (ToniAI Framework)
# Optimized for Google Cloud Run (Node 22+, production build)

FROM node:22-slim AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm ci

# Copy full application source
COPY . .

# Build the client bundle (Vite) and backend server bundle (esbuild)
RUN npm run build

# Production runtime image
FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled frontend and backend bundles
COPY --from=builder /app/dist ./dist

# Copy AI training context & knowledge bases for RAG ingestion
COPY --from=builder /app/ai_training_context ./ai_training_context

# Copy storage directory template if present
COPY --from=builder /app/storage ./storage

# Cloud Run injects PORT (default 8080)
EXPOSE 8080

CMD ["node", "dist/server.cjs"]
