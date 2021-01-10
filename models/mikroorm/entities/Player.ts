import { Cascade, Entity, ManyToOne, PrimaryKey, Property, Collection, ManyToMany } from '@mikro-orm/core';
import { Club } from './Club';
import { Equipment } from './Equipment';
import { Playerequipment } from './PlayerEquipment';

@Entity()
export class Player {

    @PrimaryKey()
    id!: number;

    @Property({ length: 255 })
    name!: string; 

    @Property({ length: 255, nullable: true })
    lastname?: string;

    @Property({ nullable: true })
    age?: number;
    
    @ManyToOne({ entity: () => Club, fieldName: 'clubId', cascade: [Cascade.MERGE], nullable: true, index: 'clubId' })
    clubId?: Club;

    @ManyToMany({entity: () => Equipment, pivotTable: 'PlayerEquipment', joinColumn: 'playerId', inverseJoinColumn: 'equipmentId' })
    equipments = new Collection<Equipment>(this);
}