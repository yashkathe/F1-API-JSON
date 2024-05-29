FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

ENV PORT 80

EXPOSE ${PORT}

CMD ["npm", "run", "start-api"]