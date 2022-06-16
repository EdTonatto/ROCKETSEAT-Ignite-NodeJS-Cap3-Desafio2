import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class migrationOrders1655347326156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'orders',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              default: 'uuid_generate_v4()'
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('orders');
    }

}
