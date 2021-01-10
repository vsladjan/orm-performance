import { Entity, PrimaryKey, Property, ManyToMany, Collection } from '@mikro-orm/core'
import { Player } from './Player';

@Entity()

export class Equipment {

    @PrimaryKey()
    id!: number;

    @Property({ length: 255 })
    name!: string;

    @Property({ length: 255, nullable: true })
    description?: string;
    
    @Property({ length: 255, nullable: true })
    color?: string;

    @ManyToMany(() => Player, player => player.equipments)
    players = new Collection<Player>(this); // inverse side
}