import * as express from 'express';
import debug from "debug";
import { POIDAO } from '../models/poi';
import { POI } from "../database/entity/poi";
import pagination from '../helper/pagination';
const debugServer = debug('ryd-task:server');
const router = express.Router();

router.get("/", async (_req, res) => {
    try {
        const pois = await POIDAO.getAllPOi();
        if (pois.length === 0) {
            debugServer("The POIs table is empty try to add more POIs")
            res.status(400).send({ message: "The POIs table is empty try to add more POIs" });
            return;
        }
        debugServer("all the POIs are retrieved")
        res.status(200).send(pois);
    } catch (error) {
        debugServer("failed to fetch all POIs %o", error)
        res.status(500).send({ message: "fail to fetch all POIs" });
    }
});
router.get("/searchById", async (req, res) => {
    try {
        const poiId = req.query.id;
        if (!poiId) {
            debugServer("The poi id is empty")
            res.status(400).send({ message: "The poi id is empty" });
            return
        }
        const searchedPOI = await POIDAO.getPOiById(Number(poiId))
        if (!searchedPOI.id) {
            throw new Error("poi with this id was not found");
        }
        debugServer("the poi are retrieved");
        res.status(200).send(searchedPOI);

    } catch (error) {
        debugServer("the poi not found %o", error)
        res.status(500).send({ message: "the poi not found" });
    }
});
router.post("/add", async (req, res) => {
    try {
        let poi: POI = req.body.poi as POI
        if (Object.keys(poi).length === 0) {
            debugServer("error the poi has no values %o", poi)
            res.status(400).send("error the poi has no values")
            return;
        }
        if (poi.status == "" || poi.country == "" || poi.zipCode == "" || poi.city == "" || poi.street == "" || poi.houseNumber == "") {
            debugServer("poi status should not be empty %o", poi)
            res.status(400).send("poi status should not be empty")
            return;
        }
        const newPoi = new POIDAO();
        for (let key in poi) {
            if (newPoi.hasOwnProperty(key)) {
                newPoi[key] = poi[key];
            }
        }
        await newPoi.save()
        debugServer("the poi added successfully")
        res.status(200).send(newPoi);
    } catch (error) {
        debugServer("the poi fail to added to the pois' table %o", error)
        res.status(500).send({ message: "the poi fail to added to the pois' table" + error });
    }
});
router.get("/paginated", async (req, res) => {
    try {
        //const POIS = await POIDAO.getAllPOi();
        const POIS = await POI.createQueryBuilder("poi")
            .leftJoinAndSelect("poi.pumps", "pumps")
            .leftJoinAndSelect("poi.openingHours", "openingHours")
            .leftJoinAndSelect("pumps.fuelProducts", "fuelProducts")
            .where("poi.id = pumps.poiId")
            .andWhere("poi.id = openingHours.poiId")
            .andWhere("pumps.id = fuelProducts.pumpId")
            .getMany();
        const paginatedResult = pagination(POIS, req);

        debugServer("all the POIs are retrieved")
        res.status(200).send(paginatedResult);
    } catch (error) {
        debugServer("failed to fetch all POIs %o", error)
        res.status(500).send({ message: "fail to fetch all POIs" });
    }

});
router.delete("/delete", async (req, res) => {
    try {
        const poiId = req.body.id
        const deletedPoi = new POIDAO();
        deletedPoi.id = poiId;
        await deletedPoi.delete()
        debugServer("the poi has been deleted successfully")
        res.status(200).send({ message: "delete poi success", deletedPoi: deletedPoi });
    } catch (error) {
        debugServer("delete poi failed %o", error)
        res.status(500).send({ message: "delete poi failed" });
    }
});

export default router;