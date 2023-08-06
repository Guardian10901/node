import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDepartment1691330963770 implements MigrationInterface {
    name = 'CreateDepartment1691330963770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "department_name_id" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_dcd4ee861b6cf092d13920d67be" FOREIGN KEY ("department_name_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_dcd4ee861b6cf092d13920d67be"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "department_name_id"`);
        await queryRunner.query(`DROP TABLE "department"`);
    }

}
