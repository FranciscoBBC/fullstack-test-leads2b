FROM node:12.20.1

WORKDIR /app
EXPOSE 8081

# vue
COPY package.json yarn.lock ./
RUN yarn install

COPY . .

CMD ["yarn", "serve"]
