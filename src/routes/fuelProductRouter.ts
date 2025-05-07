import * as express from 'express';
import debug from "debug";
import { FuelProductsDAO } from '../models/fuelProduct';
const debugServer = debug('ryd-task:server');
const router = express.Router();

router.post("/add", async (req, res) => {
    const pumpId = req.query.pumpId as string;;
    let fuelProducts = req.body.fuelProducts as FuelProductsDAO[]
    fuelProducts.forEach(fuelProduct => {
        if (fuelProduct.name == "" || fuelProduct.euro == undefined || fuelProduct.usd == undefined || fuelProduct.pumpId == "") {
            debugServer("one of fuelProduct properties is empty %o", fuelProduct)
            res.status(400).send("fuelProduct properties should not be empty")
            return;
        }
        fuelProducts.forEach(async fuelProduct => {
            const newFuelProduct = new FuelProductsDAO();
            for (let key in fuelProduct) {
                if (newFuelProduct.hasOwnProperty(key)) {
                    newFuelProduct[key] = fuelProduct[key];
                }
            }
            newFuelProduct.pumpId = pumpId;
            await newFuelProduct.save();
            debugServer("the newFuelProduct added successfully")
            res.status(200).send({ message: "success" });
        })
    });
})
router.delete("/delete", async (req, res) => {
    try {
        const fuelProductId = req.body.id
        const deletedFuelProduct = new FuelProductsDAO();
        deletedFuelProduct.id = fuelProductId;
        await deletedFuelProduct.delete()
        debugServer("the fuelProduct has been deleted successfully")
        res.status(200).send({ message: "delete fuelProduct success", deletedFuelProduct: deletedFuelProduct });
    } catch (error) {
        debugServer("delete fuelProduct failed %o", error)
        res.status(500).send({ message: "delete foi failed" });
    }
});

export default router;