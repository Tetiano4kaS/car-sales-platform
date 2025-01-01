import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReportEntitу1735222130412 implements MigrationInterface {
    name = 'AddReportEntitу1735222130412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reports" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying, "model" character varying, "userId" uuid NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_bed415cd29716cd707e9cb3c09c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_bed415cd29716cd707e9cb3c09c"`);
        await queryRunner.query(`DROP TABLE "reports"`);
    }

}
