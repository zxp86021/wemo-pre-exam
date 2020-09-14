import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn} from "typeorm";

export class createBikesTable1600057464833 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'bikes',
            columns: [
                {
                    name: 'licensePlateNumber',
                    type: 'varchar',
                    isPrimary: true
                },
                {
                    name: 'mileage',
                    type: 'decimal(9,2)',
                    default: 0
                },
                {
                    name: 'brand',
                    type: 'varchar',
                },
                {
                    name: 'isActive',
                    type: 'boolean',
                    default: true
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('bikes');
    }

}
