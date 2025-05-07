import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Pumps } from '../entity/pumps';

export class PumpsSeeder implements Seeder {
    async run(_dataSource: DataSource): Promise<void> {
        await Pumps.save([
            Pumps.create({ id: "4c1c39bf-ae1d-4f8f-b587-0192007ed990", name: 'test1', poiId: 1 }),
            Pumps.create({ name: 'test2', poiId: 1 }),
            Pumps.create({ name: 'test3', poiId: 1 }),
        ]);
    }
}