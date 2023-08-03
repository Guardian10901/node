import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAddressColumnRelation1691060760828 implements MigrationInterface {
    name = 'CreateAddressColumnRelation1691060760828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "address_id_seq" OWNED BY "address"."id"`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "id" SET DEFAULT nextval('"address_id_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "address_id_seq"`);
    }

}
