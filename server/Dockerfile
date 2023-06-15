FROM node:14.18.2-slim

# Prepare and install node dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
ENV NODE_ENV=development

# copy app
COPY . .

CMD ["node", "app.js"]
