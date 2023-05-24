FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 3000

COPY . .

CMD npm i next

CMD npm run build && npm start
