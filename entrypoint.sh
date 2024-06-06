#!/bin/bash

echo "Aguardando o PostgreSQL iniciar..."
wait-for postgres:5432
echo "PostgreSQL está pronto para aceitar conexões."

echo "Rodando migrações do banco de dados..."
npm run migration:generate
npm run migration:push

sleep 10

echo "Rodando seed do banco de dados..."
npm run migration:seed

echo "Iniciando aplicação..."
npm run start:prod

echo "Iniciando Drizzle Studio..."
npx drizzle-kit studio