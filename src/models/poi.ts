
import { POI } from "../database/entity/poi";
import { OpeningHourDAO } from "./openingHours";
import { PumpsDAO } from "./pump";

export class POIDAO {
    id?: number = undefined;
    status: string = "";
    country: string = "";
    zipCode: string = "";
    city: string = "";
    street: string = "";
    houseNumber: string = "";
    pumps: PumpsDAO[] = [];
    openinghours: OpeningHourDAO[] = [];

    save() {
        return POI.save(this as POIDAO);
    }

    static async getAllPOi(): Promise<POI[]> {
        return POI.find();
    }

    static async getPOiById(id: number): Promise<POIDAO> {
        const poi = await POI.findOneBy({ id })
        return Object.assign(new POIDAO(), poi)
    }

    delete() {
        return POI.delete({ id: this.id })
    }
}