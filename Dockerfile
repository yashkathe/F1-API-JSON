FROM node

LABEL org.opencontainers.image.source https://github.com/yashkathe/F1-API-JSON.git

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

ENV PORT 80

EXPOSE ${PORT}

CMD ["npm", "run", "start-api"]