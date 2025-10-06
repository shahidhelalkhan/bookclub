import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1704556800000 implements MigrationInterface {
  name = 'InitialSchema1704556800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "author" (
        "id" SERIAL NOT NULL,
        "name" character varying(100) NOT NULL,
        "bio" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_author_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "book" (
        "id" SERIAL NOT NULL,
        "title" character varying(200) NOT NULL,
        "description" text,
        "published_year" integer,
        "author_id" integer,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_book_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_book_author" FOREIGN KEY ("author_id")
          REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_book_author_id" ON "book" ("author_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_book_author_id"`);
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`DROP TABLE "author"`);
  }
}
