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
- [ ] AWS
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
# **Time line**
**02-04-2023**
* Vehicle list screen
* Vehicle delete screen
* Vehicle filter screen
* Vehicle create screen

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
[Pulpo.postman_collection.txt](https://github.com/MiguelAngelVM/node_typeorm_angular_example/files/11138504/Pulpo.postman_collection.txt)

**Note, change te extension to json and import**
<img width="1423" alt="Captura de Pantalla 2023-03-31 a la(s) 17 55 08" src="https://user-images.githubusercontent.com/11168366/229251978-90080efa-b68f-4db4-8941-bceeb44ebce3.png">


# **Install frontend**

* cd frontend
* npm install
* npm start

**Login screen**

<img width="1437" alt="Captura de Pantalla 2023-04-03 a la(s) 1 42 11" src="https://user-images.githubusercontent.com/11168366/229456433-d5572922-d93c-4809-8213-dbff934fe6e1.png">


**Logout screen**

<img width="1350" alt="Captura de Pantalla 2023-03-31 a la(s) 18 32 17" src="https://user-images.githubusercontent.com/11168366/229256637-dfa2f6fe-7680-43db-961a-92be722b77c3.png">

**Vehicle list screen**

<img width="1439" alt="Captura de Pantalla 2023-04-03 a la(s) 1 09 17" src="https://user-images.githubusercontent.com/11168366/229442378-f58016bf-756f-4772-a925-80fcfa4d697e.png">

**Vehicle select and delete screen**

 <img width="1438" alt="Captura de Pantalla 2023-04-03 a la(s) 1 25 50" src="https://user-images.githubusercontent.com/11168366/229442563-0834eec6-a8d2-4717-a211-00b3df03dad0.png">
 
 **Vehicle filter screen**
 
 <img width="1440" alt="Captura de Pantalla 2023-04-03 a la(s) 1 37 48" src="https://user-images.githubusercontent.com/11168366/229442655-f2836344-0eb6-43c7-a1f9-703b0379ee10.png">
 
  **Vehicle create screen**

<img width="1440" alt="Captura de Pantalla 2023-04-03 a la(s) 5 33 08" src="https://user-images.githubusercontent.com/11168366/229497693-5af1dcb2-9e43-4d8d-b83e-a2f189382bf8.png">


  **Vehicle update screen**

<img width="1437" alt="Captura de Pantalla 2023-04-03 a la(s) 7 05 06" src="https://user-images.githubusercontent.com/11168366/229518361-def3979c-d956-48e0-8bb5-bf9ed79be61f.png">
