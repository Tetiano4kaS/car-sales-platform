import { MigrationInterface, QueryRunner } from "typeorm";

export class DeliteDeviceIdColumn1733071178964 implements MigrationInterface {
    name = 'DeliteDeviceIdColumn1733071178964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "deviceId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "deviceId" text NOT NULL`);
    }

}
