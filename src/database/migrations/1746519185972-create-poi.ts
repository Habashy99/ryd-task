import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePoi1746519185972 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pois",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "status",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "country",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "zipCode",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "city",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "street",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "houseNumber",
                        type: "varchar",
                        isNullable: false,
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pois")
    }

}
