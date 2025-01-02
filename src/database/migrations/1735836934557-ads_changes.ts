import { MigrationInterface, QueryRunner } from "typeorm";

export class AdsChanges1735836934557 implements MigrationInterface {
    name = 'AdsChanges1735836934557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisement" DROP COLUMN "convertedPriceUSD"`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD "convertedPriceUSD" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP COLUMN "convertedPriceEUR"`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD "convertedPriceEUR" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP COLUMN "convertedPriceUAH"`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD "convertedPriceUAH" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisement" DROP COLUMN "convertedPriceUAH"`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD "convertedPriceUAH" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP COLUMN "convertedPriceEUR"`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD "convertedPriceEUR" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP COLUMN "convertedPriceUSD"`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD "convertedPriceUSD" integer NOT NULL`);
    }

}
