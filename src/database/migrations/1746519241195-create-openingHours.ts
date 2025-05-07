import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOpeningHours1746519241195 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "openingHours",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: "startDay",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "endDay",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "openTime",
                        type: "time",
                        isNullable: false,
                    },
                    {
                        name: "closeTime",
                        type: "time",
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
            "openingHours",
            new TableForeignKey({
                columnNames: ["poiId"],
                referencedColumnNames: ["id"],
                referencedTableName: "pois",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("openingHours")
    }

}
