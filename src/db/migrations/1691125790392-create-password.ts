import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePassword1691125790392 implements MigrationInterface {
    name = 'CreatePassword1691125790392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "password"`);
    }

}
