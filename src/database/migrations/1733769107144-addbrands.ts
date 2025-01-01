import { MigrationInterface, QueryRunner } from "typeorm";

export class Addbrands1733769107144 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO "brands" ("name")
        VALUES
        ('audi'),
          ('bmw'),
          ('kia'),
          ('mazda')
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}