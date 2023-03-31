import { MigrationInterface, QueryRunner } from "typeorm";

export class addedCatalogsEntity1680284396673 implements MigrationInterface {
    name = 'addedCatalogsEntity1680284396673'

    public async up(queryRunner: QueryRunner): Promise<void> {

        // create catalog cat_brands
        await queryRunner.query(`CREATE TABLE "cat_brands" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "name" character varying NOT NULL,
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b74AA" PRIMARY KEY ("id"))`);


        await queryRunner.query(`INSERT INTO "public"."cat_brands" ("name") VALUES ('Ford')`);
        await queryRunner.query(`INSERT INTO "public"."cat_brands" ("name") VALUES ('Renault')`);
        await queryRunner.query(`INSERT INTO "public"."cat_brands" ("name") VALUES ('BMW')`);
        await queryRunner.query(`INSERT INTO "public"."cat_brands" ("name") VALUES ('Audi')`);

        // create catalog cat_colors
        await queryRunner.query(`CREATE TABLE "cat_colors" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "name" character varying NOT NULL,
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b74BB" PRIMARY KEY ("id"))`);

        await queryRunner.query(`INSERT INTO "public"."cat_colors" ("name") VALUES ('Azul')`);
        await queryRunner.query(`INSERT INTO "public"."cat_colors" ("name") VALUES ('Verde')`);
        await queryRunner.query(`INSERT INTO "public"."cat_colors" ("name") VALUES ('Rojo')`);
        await queryRunner.query(`INSERT INTO "public"."cat_colors" ("name") VALUES ('Blanco')`);

        // create catalog cat_car_states
        await queryRunner.query(`CREATE TABLE "cat_car_states" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "name" character varying NOT NULL,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b74CC" PRIMARY KEY ("id"))`);
        
        await queryRunner.query(`INSERT INTO "public"."cat_car_states" ("name") VALUES ('Activo')`);
        await queryRunner.query(`INSERT INTO "public"."cat_car_states" ("name") VALUES ('inactivo')`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cat_brands"`);
        await queryRunner.query(`DROP TABLE "cat_colors"`);
    }

}
