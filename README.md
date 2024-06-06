# Holiday

## Teste Técnico Backend Developer [REMOTO]

Neste repositório você encontra a solução para o teste técnico para a vaga de Backend Developer [REMOTO] da Instruct! Este projeto implementa uma API para consultar e cadastrar feriados estaduais e municipais, conforme o enunciado do teste.

## Problema

A Corporação Colossal™ é uma empresa com milhares de funcionários distribuídos em diversas cidades do Brasil. O objetivo é criar uma API que permita consultar e cadastrar feriados estaduais e municipais para otimizar o atendimento ao consumidor, evitando pagamentos de adicionais em feriados municipais e estaduais.

## Solução

Desenvolvemos uma API que permite:

- Consultar feriados por estado ou município.
- Cadastrar novos feriados estaduais e municipais.
- Remover feriados cadastrados.

### Endpoints da API

- **Consultar feriados:** `GET /feriados/CODIGO-IBGE/ANO-MES-DIA/`
- **Cadastrar feriados:** `PUT /feriados/CODIGO-IBGE/MES-DIA/`
- **Remover feriados:** `DELETE /feriados/CODIGO-IBGE/MES-DIA/`
- **Cadastrar feriados móveis:** `PUT /feriados/CODIGO-IBGE/nome-do-feriado-movel/`
- **Remover feriados móveis:** `DELETE /feriados/CODIGO-IBGE/nome-do-feriado-movel/`

### Ferramentas Utilizadas

- **ORM:** Drizzle
- **Banco de dados:** PostgreSQL
- **Contêineres:** DockerCompose, DockerFile
- **Linguagem:** Typescript
- **Framework:** NestJS
- **Script:** Bash
- **Arquitetura:** Limpa (Clean Architecture)

### Deploy na AWS com Nginx e Certbot

Este projeto foi implantado na AWS usando uma instância t3.micro. O servidor web Nginx foi configurado como um proxy reverso para a API, e o certificado SSL foi gerado automaticamente usando o Certbot.

### Execução com Docker e Seeders

Para inicializar o projeto com Docker e carregar os dados iniciais, siga os passos abaixo:

1. Certifique-se de ter o Docker instalado em sua máquina.

2. **Clone este repositório:**
   - Execute o comando abaixo em seu terminal:
     ```
     git clone <URL_DO_REPOSITORIO>
     ```

3. **Navegue até o diretório do projeto:**
   - Utilize o comando:
     ```
     cd holiday
     ```

4. **Execute o seguinte comando para construir e iniciar o contêiner Docker:**
   - Utilize o comando:
     ```
     docker-compose up --build
     ```

5. **Aguarde até que o contêiner esteja em execução.**
   - Uma vez que esteja pronto, os dados serão carregados automaticamente através dos seeders.

6. **Após a inicialização, você pode acessar a API local em [http://localhost](http://localhost).**
   - **Documentação Swagger:** [http://localhost:3000/holiday#/](http://localhost:3000/holiday#/)

### Teste da API

Você pode testar a API localmente usando o URL fornecido acima. Além disso, você também pode acessar a API em produção usando o link abaixo:

- **API em Produção:** [https://holiday.3utilities.com/](https://holiday.3utilities.com/)

Se preferir, podemos disponibilizar uma instância pública da API para você rodar e testar. Por favor, nos avise se precisar de mais informações ou assistência para testar a API.

Para testar a aplicação, execute o seguinte comando:

```bash
k6 run -e API_BASE='https://holiday.3utilities.com' tests-open.js
```