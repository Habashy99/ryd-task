import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Pumps } from "./pumps"
import { OpeningHour } from "./openingHours"

@Entity({ name: "pois" })
export class POI extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  status: string
  @Column()
  country: string
  @Column()
  zipCode: string
  @Column()
  city: string
  @Column()
  street: string
  @Column()
  houseNumber: string
  @Column({ default: true })
  isClosedOnHoliday: boolean;
  @OneToMany(() => OpeningHour, (hour) => hour.poi)
  openingHours: OpeningHour[];
  @OneToMany(() => Pumps, (pumps) => pumps.poi)
  pumps: Pumps[]
}