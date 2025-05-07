import { OpeningHour } from "../database/entity/openingHours";
export class OpeningHourDAO {
    id?: number = undefined;
    startDay: number = undefined;
    endDay: number = undefined;
    openTime: string = "";
    closeTime: string = "";
    poiId: number = undefined;


    save() {
        return OpeningHour.save(this as OpeningHourDAO);
    }

    delete() {
        return OpeningHour.delete({ id: this.id })
    }

    // for the test proportions only
    static async getAllOpeningHours(): Promise<OpeningHour[]> {
        return OpeningHour.find();
    }
}