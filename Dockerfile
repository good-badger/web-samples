FROM node:latest
COPY package*.json ./
#COPY config*.json ./
COPY . .
RUN npm install
EXPOSE 3006
CMD ["npm", "start"]