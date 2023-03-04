FROM node:lts-alpine as base
WORKDIR /app
COPY . .
ARG NODE_ENV
ENV APP_ENV=${NODE_ENV}
COPY package.json ./
RUN npm install -g npm
RUN npm install -f

# Linux + Node + Source + Project dependencies + build assets
FROM base AS build
ARG NODE_ENV
ENV APP_ENV=${NODE_ENV}
ENV PORT=3000
WORKDIR /build
COPY --from=base /app ./
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

# We keep some artifacts from build
FROM node:current-alpine AS production
ENV PORT=3000
WORKDIR /app
COPY --from=build /build/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
COPY --from=build /build/.npmrc .npmrc
RUN npm install -g npm
RUN npm install next
RUN rm -f .npmrc

EXPOSE 3000
CMD npm run start