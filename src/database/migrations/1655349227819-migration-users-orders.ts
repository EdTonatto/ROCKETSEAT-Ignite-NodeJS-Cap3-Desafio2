import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class migrationUsersOrders1655349227819 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'users_orders',
          columns: [
            {
              name: 'ordersId',
              type: 'uuid',
              isNullable: false
            },
            {
              name: 'usersId',
              type: 'uuid',
              isNullable: false
            },
          ],
        }),
      );

      await queryRunner.createForeignKey(
        'users_orders',
        new TableForeignKey({
            columnNames: ['ordersId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            onDelete: 'CASCADE',
        }),
      )

      await queryRunner.createForeignKey(
        'users_orders',
        new TableForeignKey({
            columnNames: ['usersId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }),
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable('users_orders')
      if (table){
        const foreignKeyGenres = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf("ordersId") !== -1,
        )
        if (foreignKeyGenres) await queryRunner.dropForeignKey("users_orders", foreignKeyGenres)

        const foreignKeyGames = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf("usersId") !== -1,
        )
        if (foreignKeyGames) await queryRunner.dropForeignKey("users_orders", foreignKeyGames)
      }
      await queryRunner.dropTable('games_orders')
    }

}
