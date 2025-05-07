import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, RelationId } from "typeorm"
import { POI } from "./poi";

@Entity({ name: "openingHours" })
export class OpeningHour extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    startDay: number; // 0 = Sunday

    @Column({ type: 'int' })
    endDay: number;

    @Column({ type: 'time', nullable: true })
    openTime: string;

    @Column({ type: 'time', nullable: true })
    closeTime: string;

    @ManyToOne(() => POI, (poi) => poi.openingHours, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "poiId" })
    poi: POI;

    @RelationId((openingHour: OpeningHour) => openingHour.poi)
    @Column({ nullable: false })
    poiId: number

}