import { CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "../../games/entities/Game";
import { User } from "../../users/entities/User";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToMany(() => User, (user) => user.orders)
  @JoinTable()
  user: User[];

  @ManyToMany(() => Game, (game) => game.orders)
  @JoinTable()
  games: Game[];

  @CreateDateColumn()
  created_at: Date;
}