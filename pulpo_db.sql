-- -------------------------------------------------------------
-- TablePlus 5.3.5(494)
--
-- https://tableplus.com/
--
-- Database: pulpo
-- Generation Time: 2023-04-03 07:07:56.2110
-- -------------------------------------------------------------






















DROP TABLE IF EXISTS "public"."cat_brands";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."cat_brands" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    "name" varchar NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."cat_car_states";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."cat_car_states" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    "name" varchar NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."cat_colors";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."cat_colors" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    "name" varchar NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."migrations";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS migrations_id_seq;

-- Table Definition
CREATE TABLE "public"."migrations" (
    "id" int4 NOT NULL DEFAULT nextval('migrations_id_seq'::regclass),
    "timestamp" int8 NOT NULL,
    "name" varchar NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

DROP TYPE IF EXISTS "public"."users_role_enum";
CREATE TYPE "public"."users_role_enum" AS ENUM ('user', 'admin');

-- Table Definition
CREATE TABLE "public"."users" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    "name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "password" varchar NOT NULL,
    "role" "public"."users_role_enum" NOT NULL DEFAULT 'user'::users_role_enum,
    "photo" varchar NOT NULL DEFAULT 'default.png'::character varying,
    "verified" bool NOT NULL DEFAULT false,
    "verificationCode" text,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."vehicles";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."vehicles" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    "catBrandId" uuid,
    "catColorId" uuid,
    "catCarStateId" uuid,
    "model_year" date NOT NULL,
    "assigned" bool NOT NULL,
    "admission_date" date NOT NULL DEFAULT now()
);

INSERT INTO "public"."cat_brands" ("id", "created_at", "updated_at", "name") VALUES
('14b03ab2-cf5d-4312-b60d-9d716bae0361', '2023-03-31 20:10:08.742432', '2023-03-31 20:10:08.742432', 'Ford'),
('66cc6871-ece4-4fa2-aaba-189a664710ca', '2023-03-31 20:10:08.742432', '2023-03-31 20:10:08.742432', 'Renault'),
('7d7155d7-3b04-4be5-902e-36775d1fc948', '2023-03-31 20:10:08.742432', '2023-03-31 20:10:08.742432', 'Audi'),
('ef3a20f0-b23d-4556-84b8-de28962d8813', '2023-03-31 20:10:08.742432', '2023-03-31 20:10:08.742432', 'BMW');

INSERT INTO "public"."cat_car_states" ("id", "created_at", "updated_at", "name") VALUES
('49276584-3acb-42fd-970a-390c204f2135', '2023-03-31 20:10:08.742432', '2023-03-31 20:10:08.742432', 'Activo'),
('f5d7093d-3864-4e9d-beec-2d11385d516f', '2023-03-31 20:10:08.742432', '2023-03-31 20:10:08.742432', 'inactivo');

INSERT INTO "public"."cat_colors" ("id", "created_at", "updated_at", "name") VALUES
('41c24c77-21ff-4e6a-b16d-27b5872f736e', '2023-03-31 20:10:08.742432', '2023-03-31 20:10:08.742432', 'Rojo'),
('71766b5e-ae9b-4be1-b4c1-81b87706faef', '2023-03-31 20:10:08.742432', '2023-03-31 20:10:08.742432', 'Azul'),
('814a37dc-c7ca-4c1a-b34c-4634436ffca0', '2023-03-31 20:10:08.742432', '2023-03-31 20:10:08.742432', 'Blanco'),
('dc9d9e12-afc1-4812-865a-6c7b43018b6a', '2023-03-31 20:10:08.742432', '2023-03-31 20:10:08.742432', 'Verde');

INSERT INTO "public"."migrations" ("id", "timestamp", "name") VALUES
(4, 1680283396673, 'addedUserEntity1680283396673'),
(5, 1680284396673, 'addedCatalogsEntity1680284396673'),
(6, 1680288396673, 'addedVehicleEntity1680288396673');

INSERT INTO "public"."users" ("id", "created_at", "updated_at", "name", "email", "password", "role", "photo", "verified", "verificationCode") VALUES
('933b1909-c47d-42f2-a247-69ae3a85d4a1', '2023-03-30 23:24:28.713278', '2023-03-30 23:24:29.047101', 'pulpo', 'pulpo@mail.com', '$2a$12$l74bFvYvCMn3KSTkWefDfezeSQZWntN20MJtAWB05HG3F1fws4rTS', 'user', 'default.png', 't', '312670cdde92f02071e5237a2aafda22a2083ae56cc839dd866193a0cfa489a3');

INSERT INTO "public"."vehicles" ("id", "created_at", "updated_at", "catBrandId", "catColorId", "catCarStateId", "model_year", "assigned", "admission_date") VALUES
('6d1e208e-ff89-4dae-b8cc-abbb554d5ebb', '2023-04-03 12:37:17.461012', '2023-04-03 13:00:21.406591', '7d7155d7-3b04-4be5-902e-36775d1fc948', '814a37dc-c7ca-4c1a-b34c-4634436ffca0', '49276584-3acb-42fd-970a-390c204f2135', '2055-01-01', 't', '2023-04-28'),
('90469afe-e1c4-4452-b4cf-f980fb1e3884', '2023-04-03 13:00:46.418549', '2023-04-03 13:00:46.418549', '66cc6871-ece4-4fa2-aaba-189a664710ca', '71766b5e-ae9b-4be1-b4c1-81b87706faef', 'f5d7093d-3864-4e9d-beec-2d11385d516f', '2018-01-01', 'f', '2023-04-19'),
('57a42327-0f6e-43f0-8a2a-9a7b8a5146f3', '2023-04-03 12:15:16.254695', '2023-04-03 13:01:09.117632', '14b03ab2-cf5d-4312-b60d-9d716bae0361', 'dc9d9e12-afc1-4812-865a-6c7b43018b6a', '49276584-3acb-42fd-970a-390c204f2135', '2033-01-01', 't', '2018-01-25');

;
;
;
;
;
;
;
;
;
;
ALTER TABLE "public"."vehicles" ADD FOREIGN KEY ("catBrandId") REFERENCES "public"."cat_brands"("id");
ALTER TABLE "public"."vehicles" ADD FOREIGN KEY ("catColorId") REFERENCES "public"."cat_colors"("id");
ALTER TABLE "public"."vehicles" ADD FOREIGN KEY ("catCarStateId") REFERENCES "public"."cat_car_states"("id");
