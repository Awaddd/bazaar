FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG API_ENDPOINT
ARG NEXT_PUBLIC_API_ENDPOINT
ARG NEXT_PUBLIC_IMAGE_DOMAIN

ENV API_ENDPOINT=$API_ENDPOINT
ENV NEXT_PUBLIC_API_ENDPOINT=$NEXT_PUBLIC_API_ENDPOINT
ENV NEXT_PUBLIC_IMAGE_DOMAIN=$NEXT_PUBLIC_IMAGE_DOMAIN

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
