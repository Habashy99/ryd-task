import * as path from "path";
import "reflect-metadata";
import { DataSource,DataSourceOptions} from "typeorm";
import { SeederOptions } from 'typeorm-extension';
import * as dotenv from 'dotenv';
import { POISeeder } from "./seeders/poiSeeder";
import { FuelProductsSeeder } from "./seeders/fuelProductSeeder";
import { OpeningHoursSeeder } from "./seeders/openingHoursSeeder";
import { PumpsSeeder } from "./seeders/pumpSeeder";
dotenv.config();

// export const AppDataSource = new DataSource({
//     type: 'postgres',
//     host: process.env.DB_HOST,
//     port: +process.env.DB_PORT!,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     entities: [path.join(__dirname, "/entity/*.ts")],
//     migrations: [path.join(__dirname, "/migrations/*.ts")],
//     synchronize: true,
//     logging: false,
// });


const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path.join(__dirname, "/entity/*.ts")],
    migrations: [path.join(__dirname, "/migrations/*.ts")],
    seeds: [POISeeder,PumpsSeeder,FuelProductsSeeder,OpeningHoursSeeder],// ✅ Now accepted
    synchronize: true,
    logging: false,
};

export const AppDataSource = new DataSource(options);