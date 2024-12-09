FROM node:20-slim AS base

RUN corepack enable
WORKDIR /app

COPY . .

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build  

FROM base

RUN apt-get update -y
RUN apt-get install -y openssl

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.env ./env

EXPOSE 3000
CMD [ "pnpm", "run", "start", "db:migrate", "db:generate", "db:seed"]
