const dotenv = require('dotenv')
dotenv.config();
const express = require("express");
import debug from "debug";
const debugServer = debug('task:server');
import poiRoutes from "./routes/poiRouter";
import pumpRouter from "./routes/pumpRouter";
import openingHoursRouter from "./routes/openingHoursRouter";
import fuelProductRouter from "./routes/fuelProductRouter";
import { AppDataSource } from "./database/main";





const app = express();

debugServer('booting %o', 'My App');
app.use(express.json());


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    if (req.method === "OPTIONS") {
        res.status(200).end();
    } else {
        next();
    }
});



app.use("/", (req, _res, next) => {
    debugServer(req.method + ' ' + req.url);
    next();
});

app.use("/poi", poiRoutes);
app.use("/pump", pumpRouter);
app.use("/openingHours", openingHoursRouter);
app.use("/fuelProduct", fuelProductRouter);

AppDataSource.initialize()
    .then(() => {
        app.listen(process.env.PORT || 8050, () => {
            debugServer('listening');
        });
    })
    .catch((error) => console.log(error))

export default app;