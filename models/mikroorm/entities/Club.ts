import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
    
@Entity()
export class Club {

    @PrimaryKey()
    id!: number;

    @Property({ length: 255 })
    name!: string;

    @Property({ length: 255, nullable: true })
    location?: string;
    
    @Property({ nullable: true })
    created?: number;
}