FROM node:20-slim
WORKDIR /app
COPY app/package*.json ./
RUN npm install
COPY app/ .
EXPOSE 4000
CMD ["node", "index.js"]