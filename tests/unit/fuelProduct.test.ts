import { describe, expect, test } from '@jest/globals';
import { PumpsDAO } from '../../src/models/pump';
import { FuelProductsDAO } from '../../src/models/fuelProduct';
describe("test FuelProductDAO", () => {
    test("create new fuelProduct and delete it", async () => {
        const pump = await PumpsDAO.getPumpById("4c1c39bf-ae1d-4f8f-b587-0192007ed990");
        const allFuelProducts = await FuelProductsDAO.getAllFuelProduct();
        const newFuelProduct = new FuelProductsDAO();
        newFuelProduct.name = "test96";
        newFuelProduct.euro = 9.8;
        newFuelProduct.usd = 10.8;
        if (pump.id) {
            newFuelProduct.pumpId = pump.id;
        }
        await newFuelProduct.save();
        let fuelProducts = await FuelProductsDAO.getAllFuelProduct();
        expect(fuelProducts.length).toBe(allFuelProducts.length + 1);
        await newFuelProduct.delete();
        fuelProducts = await FuelProductsDAO.getAllFuelProduct();
        expect(fuelProducts.length).toBe(allFuelProducts.length);
    })
})