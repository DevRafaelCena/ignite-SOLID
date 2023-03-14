## comandos basicos

### subir docker postgresql

```
docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
```

### subir com o docker-composer

```
    docker compose up -d
```
