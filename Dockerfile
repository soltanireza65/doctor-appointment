FROM node:23-alpine AS base

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

FROM base AS dev

ENV NODE_ENV=development

EXPOSE 1337

CMD ["pnpm", "dev"]

FROM base AS build

ENV NODE_ENV=production

RUN pnpm build

FROM node:23-alpine AS prod

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

COPY --from=build /app/dist ./dist

EXPOSE 1337

CMD ["node", "dist/main"]
