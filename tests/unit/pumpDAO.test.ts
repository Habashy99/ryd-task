import { describe, expect, test } from '@jest/globals';
import { PumpsDAO } from "../../src/models/pump"
import { POIDAO } from '../../src/models/poi';
describe("test PumpDAO", () => {
    test("create new pump and delete it", async () => {
        const allPumps = await PumpsDAO.getAllPumps();
        const Pois = await POIDAO.getPOiById(1);
        const newPump = new PumpsDAO();
        newPump.name = "test-99";
        if (Pois.id) {
            newPump.poiId = Pois.id;
        }
        await newPump.save();
        let pumps = await PumpsDAO.getAllPumps();
        expect(pumps.length).toBe(allPumps.length + 1);
        await newPump.delete();
        pumps = await PumpsDAO.getAllPumps();
        expect(pumps.length).toBe(allPumps.length);
    });
})