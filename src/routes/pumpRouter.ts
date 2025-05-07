import * as express from 'express';
import debug from "debug";
import { PumpsDAO } from '../models/pump';
const debugServer = debug('ryd-task:server');
const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        let poiId = req.query.poiId;
        let pumps = req.body.pumps as PumpsDAO[];

        pumps.forEach(pump => {
            if (pump.name == "") {
                debugServer("pumps NAME should not be empty %o", pumps)
                res.status(400).send("pumps properties should not be empty")
                return;
            }
        });
        pumps.forEach(async pump => {
            const newPump = new PumpsDAO();
            for (let key in newPump) {
                if (newPump.hasOwnProperty(key)) {
                    newPump[key] = pump[key];
                }
            }
            newPump.poiId = Number(poiId);
            await newPump.save()
        });


        debugServer("the newPump added successfully")
        res.status(200).send({ message: "success" });
    } catch (error) {
        debugServer("the newPump fail to added to the newPump' table %o", error)
        res.status(500).send({ message: "the newPump fail to added to the newPump' table" + error });
    }
});

router.delete("/delete", async (req, res) => {
    try {
        const pumpId = req.body.id
        const deletedPump = new PumpsDAO();
        deletedPump.id = pumpId;
        await deletedPump.delete()
        debugServer("the pump has been deleted successfully")
        res.status(200).send({ message: "delete pump success", deletedPump: deletedPump });
    } catch (error) {
        debugServer("delete pump failed %o", error)
        res.status(500).send({ message: "delete pump failed" });
    }
});

export default router;