import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder('games')
        .where('UPPER(games.title) like UPPER(:param_title)', {param_title: `%${param}%`})
        .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query('select count(*) from games');
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // return this.repository
    return getRepository(User)
      .createQueryBuilder('users')
      .innerJoinAndSelect('users_games_games', 'ugg', 'ugg.usersId = users.id')
      .innerJoinAndSelect('games', 'g', 'g.id = ugg.gamesId')
      .where('g.id = :id_game', {id_game: id})
      .getMany();
  }
}
