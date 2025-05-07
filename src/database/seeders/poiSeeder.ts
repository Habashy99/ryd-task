import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { POI } from '../entity/poi';

export class POISeeder implements Seeder {
    async run(_dataSource: DataSource): Promise<void> {
        console.log('⛽ Inserting POIs with BaseEntity...');
        await POI.save([
            POI.create({ status: 'ONLINE', country: "Germany",zipCode: '80939', city: "München",street: 'Ingolstaedter Str', houseNumber: "59" }),
            POI.create({ status: 'ONLINE', country: "Germany",zipCode: '80938', city: "München",street: 'Ingolstaedter Str', houseNumber: "58" }),
            POI.create({ status: 'ONLINE', country: "Germany",zipCode: '80937', city: "München",street: 'Ingolstaedter Str', houseNumber: "57" }),
            POI.create({ status: 'ONLINE', country: "Germany",zipCode: '80936', city: "München",street: 'Ingolstaedter Str', houseNumber: "56" }),
            POI.create({ status: 'ONLINE', country: "Germany",zipCode: '80935', city: "München",street: 'Ingolstaedter Str', houseNumber: "55" }),
        ]);
        console.log('✅ POIs inserted');
    }
}
