import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "../../games/entities/Game";

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToMany(() => Game, (game) => game.genres)
  games: Game[];

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}