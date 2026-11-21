FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

COPY package*.json ./

RUN npm ci

COPY . .

RUN DATABASE_URL=postgresql://username:password@hostname:port/database npm run build

EXPOSE 3000

CMD ["npm", "start"]
