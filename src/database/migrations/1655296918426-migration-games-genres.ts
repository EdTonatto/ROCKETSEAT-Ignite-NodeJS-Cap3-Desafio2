import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class migrationGamesGenres1655296918426 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'games_genres',
          columns: [
            {
              name: 'gamesId',
              type: 'uuid',
              isNullable: false
            },
            {
              name: 'genresId',
              type: 'uuid',
              isNullable: false
            },
          ],
        }),
      );

      await queryRunner.createForeignKey(
        'games_genres',
        new TableForeignKey({
            columnNames: ['genresId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'genres',
            onDelete: 'CASCADE',
        }),
      )

      await queryRunner.createForeignKey(
        'games_genres',
        new TableForeignKey({
            columnNames: ['gamesId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'games',
            onDelete: 'CASCADE',
        }),
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable('games_genres')
      if (table){
        const foreignKeyGenres = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf("genresId") !== -1,
        )
        if (foreignKeyGenres) await queryRunner.dropForeignKey("games_genres", foreignKeyGenres)

        const foreignKeyGames = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf("gamesId") !== -1,
        )
        if (foreignKeyGames) await queryRunner.dropForeignKey("games_genres", foreignKeyGames)
      }
      await queryRunner.dropTable('games_genres')
    }

}
