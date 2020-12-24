import { Cascade, Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Club } from './Club';

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
}