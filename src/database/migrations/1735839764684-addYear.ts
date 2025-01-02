import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddYear1735839764684 implements MigrationInterface {
    name = 'AddYear1735839764684';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      ALTER TABLE "advertisement" ADD "year" integer DEFAULT 2000
    `);

        await queryRunner.query(`
      UPDATE "advertisement" SET "year" = 2000
    `);

        await queryRunner.query(`
      ALTER TABLE "advertisement" ALTER COLUMN "year" SET NOT NULL
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      ALTER TABLE "advertisement" DROP COLUMN "year"
    `);
    }
}
