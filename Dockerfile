# ------------------------------------
# ---------- Stage 1: Build ----------
# ------------------------------------
FROM node:lts-alpine3.22 AS builder

WORKDIR /app

# Copy package files first for caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm and all dependencies (dev + prod)
RUN npm install -g pnpm
RUN pnpm install

# Copy source code
COPY . .

# Declare build args (secrets for prerender)
ARG DATABASE_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG BETTER_AUTH_SECRET
ARG BETTER_AUTH_URL
ARG VITE_APP_HOST

# Set temporary ENV for build (not persisted in final image)
ENV DATABASE_URL=$DATABASE_URL \
  GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID \
  GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET \
  BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET \
  BETTER_AUTH_URL=$BETTER_AUTH_URL \
  VITE_APP_HOST=$VITE_APP_HOST

# Build app (uses build-time ENV)
RUN pnpm build

# -----------------------------------------
# ---------- Stage 2: Production ----------
# -----------------------------------------
FROM node:lts-alpine3.22 AS runner

WORKDIR /app

# Install pnpm (needed to serve)
RUN npm install -g pnpm

# Copy only prod dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

# Copy built output from builder
COPY --from=builder /app/dist ./    

EXPOSE 3693

ENTRYPOINT ["pnpm","serve"]
