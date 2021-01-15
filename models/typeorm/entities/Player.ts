import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Club } from "./Club";
import { Equipment } from "./Equipment";

@Index("clubId", ["clubId"], {})
@Entity("player", { schema: "orm" })
export class Player {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "lastname", nullable: true, length: 255 })
  lastname: string | null;

  @Column("int", { name: "age", nullable: true })
  age: number | null;

  @Column("int", { name: "clubId", nullable: true })
  clubId: number | null;

  @ManyToOne(() => Club, (club) => club.players, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "clubId", referencedColumnName: "id" }])
  club: Club;

  @ManyToMany(() => Equipment, (equipment) => equipment.players)
  @JoinTable({
    name: "playerequipment",
    joinColumns: [{ name: "playerId", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "equipmentId", referencedColumnName: "id" }],
    schema: "orm",
  })
  equipment: Equipment[];
}
