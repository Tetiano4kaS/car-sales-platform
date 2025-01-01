import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountTypes1733083439089 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            INSERT INTO "account_types" ("name", "description") 
            VALUES 
                ('basic', 'Базовий акаунт'),
                ('premium', 'Преміум акаунт')
        `);
    }

  public async down(queryRunner: QueryRunner): Promise<void> {

  }
}
