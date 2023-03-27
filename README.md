# Nest_graphQL
# Requirement
 - Nodejs
 - Docker
 - Hasura
 - PostgresQL
 
# Run
 ## Add .env
 ## [Set up Hasura migrations, metadata and seeds](https://hasura.io/docs/latest/migrations-metadata-seeds/migrations-metadata-setup/).
  Run migrations

  ```
  yarn hasura migrate apply
  ```

  Apply metadata

  ```
  yarn hasura metadata apply
  ```
 ## Docker
 1. $ docker pull
 2. $ docker compose up (-d)
 
# GraphQL playground and Hasura console: 
- http://localhost:3000/graphql
- http://localhost:8080/