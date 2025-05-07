import { describe, expect, test } from '@jest/globals';
import { POIDAO } from "../../src/models/poi"
describe("test PoisDAO", () => {
    test("create new Pois and delete it", async () => {
        const totalPois = await POIDAO.getAllPOi();
        const newPoi = new POIDAO();
        newPoi.city = "Berlin";
        newPoi.country = "Germany";
        newPoi.houseNumber = "39";
        newPoi.status = "opening";
        newPoi.zipCode = "10505";
        await newPoi.save();
        let pois = await POIDAO.getAllPOi();
        expect(pois.length).toBe(totalPois.length + 1);
        await newPoi.delete();
        pois = await POIDAO.getAllPOi();
        expect(pois.length).toBe(totalPois.length);
    });

    test("get all Pois", async () => {
        const pois = await POIDAO.getAllPOi()
        expect(Array.isArray(pois)).toBeTruthy();
    })

})