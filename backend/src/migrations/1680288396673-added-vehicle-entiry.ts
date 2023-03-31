import { MigrationInterface, QueryRunner } from "typeorm";

export class addedVehicleEntity1680288396673 implements MigrationInterface {
    name = 'addedVehicleEntity1680288396673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        // create vehicles table
        await queryRunner.query(`CREATE TABLE "vehicles" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "catBrandId" uuid, 
            "catColorId" uuid, 
            "catCarStateId" uuid, 
            "model_year" DATE NOT NULL,
            "assigned" BOOLEAN NOT NULL,
            "admission_date" DATE NOT NULL DEFAULT now())
        `);
        
        // create vehicles fk
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fe1" FOREIGN KEY ("catBrandId") REFERENCES "cat_brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fe2" FOREIGN KEY ("catColorId") REFERENCES "cat_colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fe3" FOREIGN KEY ("catCarStateId") REFERENCES "cat_car_states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fe1"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fe2"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fe3"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
    }

}
