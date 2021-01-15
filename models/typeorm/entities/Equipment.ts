import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./Player";

@Entity("equipment", { schema: "orm" })
export class Equipment {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @Column("varchar", { name: "color", nullable: true, length: 255 })
  color: string | null;

  @ManyToMany(() => Player, (player) => player.equipment)
  players: Player[];
}
