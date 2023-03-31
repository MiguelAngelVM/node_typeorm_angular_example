Install

cd backend
cp example.env .env
npm install
docker compose up -d
npm run db:push


Nota, si ya se cuenta con una base de datos con users_role_enum
comentar la siguiente linea de la migración 1680283396673-added-user-entity.ts

await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`);


Ayuda adicional 
Clean cache and restart docker
docker kill $(docker ps -q)
docker_clean_ps
docker rmi $(docker images -a -q)
docker system prune -a