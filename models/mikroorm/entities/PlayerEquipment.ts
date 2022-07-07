import { Cascade, Entity, ManyToOne } from '@mikro-orm/core';
import { Equipment } from './Equipment';
import { Player } from './Player';

@Entity()
export class Playerequipment {

    @ManyToOne({ entity: () => Player, fieldName: 'playerId', cascade: [Cascade.MERGE], primary: true })
    playerId!: Player;

    @ManyToOne({ entity: () => Equipment, fieldName: 'equipmentId', cascade: [Cascade.MERGE], primary: true, index: 'equipmentId' })
    equipmentId!: Equipment;
}