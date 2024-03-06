FROM node:lts-buster
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8000 5000
CMD ["node", "index.js"]
