import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateFuelProducts1746519228753 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "fuelProducts",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "euro",
                        type: "decimal",
                        isNullable: false,
                    },
                    {
                        name: "usd",
                        type: "decimal",
                        isNullable: false,
                    },
                    {
                        name: "pumpId",
                        type: "uuid",
                        isNullable: false,
                    },
                ],
            })

        )
        await queryRunner.createForeignKey(
            "fuelProducts",
            new TableForeignKey({
                columnNames: ["pumpId"],
                referencedColumnNames: ["id"],
                referencedTableName: "pumps",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("fuelProducts")
    }

}
