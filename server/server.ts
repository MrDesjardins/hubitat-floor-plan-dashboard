import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import WebSocket from "ws";
import fetch from "node-fetch";
import timeout from "connect-timeout";

const webApp = express();
const corsOptions: cors.CorsOptions = {
    origin: "http://10.0.0.177:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
webApp.use(cors(corsOptions));
// webApp.use(timeout("15s"));
const webPort = process.env.PORT || 5000;
const hubitatIP = "10.0.0.191";
export const APP_ID = 98;
export const API_TOKEN = "8b8daecf-02ee-4f3d-8d80-ba4eec2d3ff5";

webApp.use(bodyParser.json());
webApp.use(bodyParser.urlencoded({ extended: true }));

webApp.get("/api/getall", async (req: any, res: any) => {
    const data = await fetch(
        `http://${hubitatIP}/apps/api/${APP_ID}/devices/all?access_token=${API_TOKEN}`
    );
    const jsonData = await data.json();

    res.send(jsonData);
});

webApp.get("/api/save/:deviceid/:key/:value", async (req: any, res: any) => {
    const id = req.params.deviceid;
    const key = req.params.key;
    const value = req.params.value;
    const data = await fetch(
        `http://${hubitatIP}/apps/api/${APP_ID}/devices/${id}/${key}/${value}?access_token=${API_TOKEN}`
    );
    const jsonData = await data.json();
    res.send(jsonData);
});

webApp.get("/api/save/:deviceid/:key", async (req: any, res: any) => {
    const id = req.params.deviceid;
    const key = req.params.key;

    const data = await fetch(
        `http://${hubitatIP}/apps/api/${APP_ID}/devices/${id}/${key}?access_token=${API_TOKEN}`
    );
    const jsonData = await data.json();
    res.send(jsonData);
});

/**
 *
 */
webApp.post("/refresh", (req: any, res: any) => {
    const data = JSON.stringify(req.body.content);
    console.log(data);

    wsApp.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
});

webApp.listen(webPort, () => console.log(`Listening on port ${webPort}`));

const wsApp = new WebSocket.Server({ port: 5001 });

wsApp.on("connection", function connection(ws) {
    console.log(`Connection established: `);
    ws.on("message", function incoming(message) {
        console.log("received: %s", message);
    });
});

// wsApp.on("message", function incoming(data) {
//     console.log(data);
// });
