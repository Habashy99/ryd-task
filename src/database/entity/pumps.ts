import { BaseEntity, Entity, PrimaryGeneratedColumn, Column,OneToMany, ManyToOne, JoinColumn, RelationId } from "typeorm"
import { POI } from "./poi"
import { FuelProducts } from "./fuelProducts"

@Entity({name:"pumps"})
export class Pumps extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column()
    name: string
    @OneToMany(()=>FuelProducts,(fuelProducts)=>fuelProducts.pumps)
    fuelProducts:FuelProducts[]

    @ManyToOne(() => POI, (poi) => poi.pumps)
    @JoinColumn({ name: "poiId" })
    poi: POI
    @RelationId((pumps: Pumps) => pumps.poi)
    @Column({nullable:false})
    poiId: number
}