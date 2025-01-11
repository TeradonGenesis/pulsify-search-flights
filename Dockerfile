# run build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# prod
FROM node:18-alpine

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production

# Copy .env.sample to .env
COPY .env.sample ./.env

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["yarn", "start:prod"]