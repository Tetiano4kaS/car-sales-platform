import { MigrationInterface, QueryRunner } from "typeorm";

export class DropCarBrandsandModelsTables1735837701633 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "car_models" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "car_brand" CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
