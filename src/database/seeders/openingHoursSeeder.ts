import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { OpeningHour } from '../entity/openingHours';

export class OpeningHoursSeeder implements Seeder {
    async run(_dataSource: DataSource): Promise<void> {
        await OpeningHour.save([
            OpeningHour.create({ startDay: 1, endDay: 4, openTime: '8:00', closeTime: "20:00", poiId: 1 }),
        ]);
    }
}
