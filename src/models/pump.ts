import { Pumps } from "../database/entity/pumps";
import { FuelProductsDAO } from "./fuelProduct";
export class PumpsDAO {
    id?: string = undefined;
    name: string = "";
    poiId: number = undefined;
    fuelProduct: FuelProductsDAO[] = [];


    save() {
        return Pumps.save(this as PumpsDAO);
    }

    delete() {
        return Pumps.delete({ id: this.id })
    }

    // for the test proportions only
    static async getAllPumps(): Promise<Pumps[]> {
        return Pumps.find();
    }
}