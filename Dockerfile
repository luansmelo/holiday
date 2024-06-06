FROM node:20.12.2

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN curl -o /usr/local/bin/wait-for -L https://raw.githubusercontent.com/eficode/wait-for/v2.1.0/wait-for && chmod +x /usr/local/bin/wait-for
RUN apt-get update && apt-get install -y netcat-openbsd

COPY . .

RUN npm run build

EXPOSE 3000

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]
