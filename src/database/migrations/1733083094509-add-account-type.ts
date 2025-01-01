import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountType1733083094509 implements MigrationInterface {
    name = 'AddAccountType1733083094509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."account_types_name_enum" AS ENUM('basic', 'premium')`);
        await queryRunner.query(`CREATE TABLE "account_types" ("id" SERIAL NOT NULL, "name" "public"."account_types_name_enum" NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_0ca9a8184d6c97c518fc317e7a6" UNIQUE ("name"), CONSTRAINT "PK_1944ce0e8e4a9f29fa1d4fbe4ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "accountTypeId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_5e1a29e5ed3f2c167f87f2993ac" FOREIGN KEY ("accountTypeId") REFERENCES "account_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_5e1a29e5ed3f2c167f87f2993ac"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountTypeId"`);
        await queryRunner.query(`DROP TABLE "account_types"`);
        await queryRunner.query(`DROP TYPE "public"."account_types_name_enum"`);
    }

}
