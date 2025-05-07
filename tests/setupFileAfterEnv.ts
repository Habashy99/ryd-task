import { DataSource } from 'typeorm';
import "reflect-metadata"
import { Pumps } from "../src/database/entity/pumps";
import { POI } from "../src/database/entity/poi";
import { OpeningHour } from "../src/database/entity/openingHours";
import { FuelProducts } from "../src/database/entity/fuelProducts";

const dotenv = require('dotenv')
beforeAll(() => {
    dotenv.config();

    const TestDataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT!,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [FuelProducts, OpeningHour, POI, Pumps],
        synchronize: true
    })
    return TestDataSource.initialize();
})
