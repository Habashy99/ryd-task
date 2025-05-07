import * as express from 'express';
import debug from "debug";
import { OpeningHourDAO } from '../models/openingHours';
const debugServer = debug('ryd-task:server');
const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const poiId = req.query.poiId;
        let openingHours = req.body.openingHours as OpeningHourDAO[];

        openingHours.forEach(openingHour => {
            if (openingHour.startDay == null || openingHour.endDay == null || openingHour.openTime == "" || openingHour.closeTime == "") {
                debugServer("one of openingHour properties is empty %o", openingHour)
                res.status(400).send("openingHour properties should not be empty")
                return;
            }
        });
        openingHours.forEach(async openingHour => {
            const newOpeningHour = new OpeningHourDAO();
            for (let key in openingHour) {
                if (newOpeningHour.hasOwnProperty(key)) {
                    newOpeningHour[key] = openingHour[key];
                }
            }
            newOpeningHour.poiId = Number(poiId);
            await newOpeningHour.save()
        });


        debugServer("the newOpeningHours added successfully")
        res.status(200).send({ message: "success" });
    } catch (error) {
        debugServer("the newOpeningHours fail to added to the newOpeningHours' table %o", error)
        res.status(500).send({ message: "the newOpeningHours fail to added to the newOpeningHours' table" + error });
    }
});

router.delete("/delete", async (req, res) => {
    try {
        const openingHoursId = req.body.id
        const deletedOpeningHours = new OpeningHourDAO();
        deletedOpeningHours.id = openingHoursId;
        await deletedOpeningHours.delete()
        debugServer("the openingHours has been deleted successfully")
        res.status(200).send({ message: "delete openingHours success", deletedOpeningHours: deletedOpeningHours });
    } catch (error) {
        debugServer("delete openingHours failed %o", error)
        res.status(500).send({ message: "delete openingHours failed" });
    }
});

export default router;