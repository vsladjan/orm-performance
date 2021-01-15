import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./Player";

@Entity("club", { schema: "orm" })
export class Club {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "location", nullable: true, length: 255 })
  location: string | null;

  @Column("int", { name: "created", nullable: true })
  created: number | null;

  @OneToMany(() => Player, (player) => player.club)
  players: Player[];
}
