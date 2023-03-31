import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1680283396673 implements MigrationInterface {
    name = 'addedUserEntity1680283396673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`);
        
        // Create user table
        await queryRunner.query(`CREATE TABLE "users" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "name" character varying NOT NULL, 
            "email" character varying NOT NULL, 
            "password" character varying NOT NULL, 
            "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', 
            "photo" character varying NOT NULL DEFAULT 'default.png', 
            "verified" boolean NOT NULL DEFAULT false, 
            "verificationCode" text, 
            CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), 
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(`CREATE INDEX "email_index" ON "users" ("email") `);
        await queryRunner.query(`CREATE INDEX "verificationCode_index" ON "users" ("verificationCode") `);

        // Create pulpo user password pulpo123
        await queryRunner.query(`INSERT INTO "public"."users" (
            "id", 
            "created_at", 
            "updated_at", 
            "name", 
            "email", 
            "password", 
            "role", 
            "photo", 
            "verified", 
            "verificationCode") 
        VALUES (
            '933b1909-c47d-42f2-a247-69ae3a85d4a1', 
            '2023-03-30 23:24:28.713278', 
            '2023-03-30 23:24:29.047101', 
            'pulpo', 
            'pulpo@mail.com', 
            '$2a$12$l74bFvYvCMn3KSTkWefDfezeSQZWntN20MJtAWB05HG3F1fws4rTS', 
            'user', 
            'default.png', 
            'true', 
            '312670cdde92f02071e5237a2aafda22a2083ae56cc839dd866193a0cfa489a3')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."verificationCode_index"`);
        await queryRunner.query(`DROP INDEX "public"."email_index"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
