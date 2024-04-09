FROM node:20-bullseye-slim

WORKDIR /app/

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]