import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoleInEmployee1691138176088 implements MigrationInterface {
    name = 'CreateRoleInEmployee1691138176088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "role" character varying NOT NULL DEFAULT 'Developer'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role"`);
    }

}
