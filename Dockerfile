FROM node
WORKDIR /app
COPY package* ./
RUN npm install
COPY index.js .
HEALTHCHECK --interval=15s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1

CMD ["node", "index.js"]