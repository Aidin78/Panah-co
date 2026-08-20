FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat vips-dev
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM base AS runtime
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app ./
EXPOSE 1337
CMD ["npm", "run", "start"]
