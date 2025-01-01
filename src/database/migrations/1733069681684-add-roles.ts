import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoles1733069681684 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "roles" ("id", "name")
            VALUES 
            (uuid_generate_v4(), 'buyer'),
            (uuid_generate_v4(), 'seller'),
            (uuid_generate_v4(), 'manager'),
            (uuid_generate_v4(), 'admin');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "roles" 
            WHERE "name" IN ('buyer', 'seller', 'manager', 'admin');
        `);
    }

}
