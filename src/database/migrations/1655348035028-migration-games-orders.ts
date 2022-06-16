import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class migrationUsersOrders1655348035028 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'games_orders',
          columns: [
            {
              name: 'ordersId',
              type: 'uuid',
              isNullable: false
            },
            {
              name: 'gamesId',
              type: 'uuid',
              isNullable: false
            },
          ],
        }),
      );

      await queryRunner.createForeignKey(
        'games_orders',
        new TableForeignKey({
            columnNames: ['ordersId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            onDelete: 'CASCADE',
        }),
      )

      await queryRunner.createForeignKey(
        'games_orders',
        new TableForeignKey({
            columnNames: ['gamesId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'games',
            onDelete: 'CASCADE',
        }),
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable('games_orders')
      if (table){
        const foreignKeyGenres = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf("ordersId") !== -1,
        )
        if (foreignKeyGenres) await queryRunner.dropForeignKey("games_orders", foreignKeyGenres)

        const foreignKeyGames = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf("gamesId") !== -1,
        )
        if (foreignKeyGames) await queryRunner.dropForeignKey("games_orders", foreignKeyGames)
      }
      await queryRunner.dropTable('games_orders')
    }

}
