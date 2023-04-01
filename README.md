# node typeorm angular example

**Requested technologies backend**
- [X] Nodejs
- [X] Typescript
- [X] Typeorm
- [X] Postgres
- [ ] Jest

**Requested technologies frontend**
- [X] Angular
- [X] Tailwind
- [X] Rxjs
- [X] Ngrx

**Additional technologies**
- [X] AWS
- [X] Postman
- [X] Docker


# **Time line**
**31-03-2023**
* Create new project **backend**
* Create structure **backend**
* Create docker postgres
* Create migrations
* Create auth structure
* Create WS getBrands
* Create WS getColor
* Create WS getCarState
* Create WS Vehicle List
* Create WS Add Vehicle
* Create WS Update Vehicle
* Create WS Detele Vehicle
* Create new project **frontend**
* Create structure **frontend**
* Create auth structure 
* Create structure file vhicle list screen

# **Install backend**

**Required install docker**

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
<img width="1423" alt="Captura de Pantalla 2023-03-31 a la(s) 17 55 08" src="https://user-images.githubusercontent.com/11168366/229251978-90080efa-b68f-4db4-8941-bceeb44ebce3.png">


# **Install frontend**

* cd frontend
* npm install
* npm start

**Login screen**

<img width="1437" alt="Captura de Pantalla 2023-03-31 a la(s) 18 32 24" src="https://user-images.githubusercontent.com/11168366/229256620-68bfecb9-1c4d-4038-b653-0cb8cc8a52e4.png">

**Logout screen**

<img width="1350" alt="Captura de Pantalla 2023-03-31 a la(s) 18 32 17" src="https://user-images.githubusercontent.com/11168366/229256637-dfa2f6fe-7680-43db-961a-92be722b77c3.png">


