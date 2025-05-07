import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, RelationId } from "typeorm"
import { Pumps } from "./pumps"

@Entity({name:"fuelProducts"})
export class FuelProducts extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column("decimal")
    euro: number
    @Column("decimal")
    usd:number
    @ManyToOne(() => Pumps, (pumps) => pumps.fuelProducts, { eager: false })
    @JoinColumn({ name: "pumpId" })
    pumps: Pumps
    @RelationId((fuelProducts: FuelProducts) => fuelProducts.pumps)
    @Column({ type: 'uuid',nullable:false})
    pumpId: string
}