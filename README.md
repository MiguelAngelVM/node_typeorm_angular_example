# node_typeorm_angular_example

**Required docker**

**Install backend**
* cd backend
* cp example.env .env
* npm install
* docker compose up -d
* npm run db:push



**note**, If you already have a database with users_role_enum
comment the next line of the migration
* 1680283396673-added-user-entity.ts `await queryRunner.query(CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin'));`


**Extra help** Clean cache and restart docker

* docker kill $(docker ps -q)
* docker_clean_ps
* docker rmi $(docker images -a -q)
* docker system prune -a


**Postman**
[Pulpo.postman_collection.txt](https://github.com/MiguelAngelVM/node_typeorm_angular_example/files/11127366/Pulpo.postman_collection.txt)
**Note, change te extension to json and import**
