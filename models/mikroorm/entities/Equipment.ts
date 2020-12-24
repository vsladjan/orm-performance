import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
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
}