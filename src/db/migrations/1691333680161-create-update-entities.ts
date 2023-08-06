import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUpdateEntities1691333680161 implements MigrationInterface {
    name = 'CreateUpdateEntities1691333680161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_dcd4ee861b6cf092d13920d67be"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line1"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "department_name_id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line_1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line_2" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "experience" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "department_id_id" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_3b80acaf3052672f7196c04de9e" FOREIGN KEY ("department_id_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_3b80acaf3052672f7196c04de9e"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "department_id_id"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line_2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line_1"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "department_name_id" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "age" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "line1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_dcd4ee861b6cf092d13920d67be" FOREIGN KEY ("department_name_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
