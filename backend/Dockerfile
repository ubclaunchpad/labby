FROM node:18
WORKDIR /code
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]