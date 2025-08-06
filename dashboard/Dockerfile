# dashboard/Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000
CMD ["npx", "serve", "-s", "build", "-l", "4000"]
