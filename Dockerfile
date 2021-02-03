FROM node:12.18.3

RUN mkdir -p /bot
WORKDIR /bot

COPY . /bot

RUN npm install -g typescript
RUN npm install
RUN npm build
RUN npm cache clean --force

CMD ["npm", "run", "start"]