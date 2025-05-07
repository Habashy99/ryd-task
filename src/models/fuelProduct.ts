import { FuelProducts } from "../database/entity/fuelProducts";
export class FuelProductsDAO {
    id?: number = undefined;
    name: string = "";
    euro: number = undefined;;
    usd: number = undefined;;
    pumpId: string = "";

    save() {
        return FuelProducts.save(this as FuelProductsDAO);
    }

    delete() {
        return FuelProducts.delete({ id: this.id })
    }

    // for the test proportions only
    static async getAllFuelProduct(): Promise<FuelProducts[]> {
        return FuelProducts.find();
    }
}