import { MigrationInterface, QueryRunner } from "typeorm";

export class DropAdsTable1735834133113 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "ads"`);
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
