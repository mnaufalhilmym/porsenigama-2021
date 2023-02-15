FROM node:16.19.0-alpine3.17 AS base

FROM base AS deps
WORKDIR /app
COPY ./package.json .
RUN npm i --legacy-peer-deps

FROM deps AS runner
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD npm run start
