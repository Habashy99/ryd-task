import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { FuelProducts } from '../entity/fuelProducts';
import { Pumps } from '../entity/pumps';

export class FuelProductsSeeder implements Seeder {
    async run(_dataSource: DataSource): Promise<void> {
        const pump = await Pumps.findOne({where:{id:"4c1c39bf-ae1d-4f8f-b587-0192007ed990"}});
        await FuelProducts.save([
            FuelProducts.create({ name: "SUPER E10", euro: 8.5, usd: 9.6, pumpId: pump.id }),
        ]);
    }
}