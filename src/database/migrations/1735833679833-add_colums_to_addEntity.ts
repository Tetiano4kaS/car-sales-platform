import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumsToAddEntity1735833679833 implements MigrationInterface {
    name = 'AddColumsToAddEntity1735833679833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "advertisement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "price" double precision NOT NULL, "currency" character varying NOT NULL, "convertedPriceUSD" integer NOT NULL, "convertedPriceEUR" integer NOT NULL, "convertedPriceUAH" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'draft', "editAttempts" integer NOT NULL DEFAULT '0', "views" integer NOT NULL DEFAULT '0', "viewsByPeriod" text, "region" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_c8486834e5ef704ec05b7564d89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1ed4fa5bd996e0995146f95d78" ON "advertisement" ("region") `);
        await queryRunner.query(`CREATE TABLE "car_brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_fd0cc605fc786e24e1b24f6d10f" UNIQUE ("name"), CONSTRAINT "PK_cbaa76a620e6e21773085a96bf1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_models" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "brandId" uuid, CONSTRAINT "PK_ee4355345e0e1c18cb6efa2bd5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD CONSTRAINT "FK_6ec9d86e7c48126869b4c7f22db" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car_models" ADD CONSTRAINT "FK_4fe74a5aa20adb9fbfe741f0acf" FOREIGN KEY ("brandId") REFERENCES "car_brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_models" DROP CONSTRAINT "FK_4fe74a5aa20adb9fbfe741f0acf"`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP CONSTRAINT "FK_6ec9d86e7c48126869b4c7f22db"`);
        await queryRunner.query(`DROP TABLE "car_models"`);
        await queryRunner.query(`DROP TABLE "car_brand"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ed4fa5bd996e0995146f95d78"`);
        await queryRunner.query(`DROP TABLE "advertisement"`);
    }

}
