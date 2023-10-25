FROM node:20.8-alpine

EXPOSE 3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm cache clean --force
COPY . .

RUN npm run build

CMD ["node", "./dist/index.js"]