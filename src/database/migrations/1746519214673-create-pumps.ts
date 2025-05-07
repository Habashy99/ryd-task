import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePumps1746519214673 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pumps",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "poiId",
                        type: "int",
                        isNullable: false,
                    },
                ],
            })
        )
        await queryRunner.createForeignKey(
            "pumps",
            new TableForeignKey({
                columnNames: ["poiId"],
                referencedColumnNames: ["id"],
                referencedTableName: "pois",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pumps")
    }

}
