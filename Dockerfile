FROM node
WORKDIR /app
COPY package* ./
RUN npm install
COPY index.js .

CMD ["node", "index.js"]
