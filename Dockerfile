FROM node:alpine

WORKDIR /app

COPY package.json .
RUN npm install 
COPY . .

# CMD ["npm", "run", "seed"]
CMD ["npm", "run", "start"]