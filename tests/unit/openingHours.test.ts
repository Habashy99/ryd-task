import { describe, expect, test } from '@jest/globals';
import { OpeningHourDAO } from '../../src/models/openingHours';
import { POIDAO } from '../../src/models/poi';
describe("test OpeningHourDAO", () => {
    test("create new opening hour and delete it", async () => {
        const allOpeningHours = await OpeningHourDAO.getAllOpeningHours();
        const poi = await POIDAO.getPOiById(1);
        const newOpeningHour = new OpeningHourDAO();
        newOpeningHour.startDay = 1;
        newOpeningHour.endDay = 6;
        newOpeningHour.openTime = "07:00";
        newOpeningHour.closeTime = "23:00";
        if (poi.id) {
            newOpeningHour.poiId = poi.id;
        }
        await newOpeningHour.save();
        let openingHours = await OpeningHourDAO.getAllOpeningHours();
        expect(openingHours.length).toBe(allOpeningHours.length + 1);
        await newOpeningHour.delete();
        openingHours = await OpeningHourDAO.getAllOpeningHours();
        expect(openingHours.length).toBe(allOpeningHours.length);

    })
})