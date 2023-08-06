import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJoiningDate1691337735183 implements MigrationInterface {
    name = 'CreateJoiningDate1691337735183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_3b80acaf3052672f7196c04de9e"`);
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "department_id_id" TO "departmentId"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_4edfe103ebf2fcb98dbb582554b" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_4edfe103ebf2fcb98dbb582554b"`);
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "departmentId" TO "department_id_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_3b80acaf3052672f7196c04de9e" FOREIGN KEY ("department_id_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
