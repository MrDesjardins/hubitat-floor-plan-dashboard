import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import WebSocket from "ws";
import fetch from "node-fetch";
import timeout from "connect-timeout";
import dotenv from "dotenv";
dotenv.config();

const HUBITAT_IP = process.env.REACT_APP_HUBITAT_IP;

const WEB_IP = process.env.REACT_APP_WEB_IP;
const WEB_PORT = process.env.REACT_APP_WEB_PORT;

const SERVER_IP = process.env.REACT_APP_SERVER_IP;
const SERVER_PORT = Number(process.env.REACT_APP_SERVER_PORT);

const WEBSOCKET_PORT = Number(process.env.REACT_APP_WEBSOCKET_PORT);
export const APP_ID = process.env.REACT_APP_HUBITAT_APP_ID;
export const API_TOKEN = process.env.REACT_APP_HUBITAT_API_TOKEN;

console.log(`Hubitat server on IP ${HUBITAT_IP}, `);
console.log(`Server  ${SERVER_IP}:${SERVER_PORT}, `);
console.log(`WS  ${SERVER_IP}:${WEBSOCKET_PORT}, `);
console.log(`Website  ${WEB_IP}:${WEB_PORT}, `);

const serverApp = express();
const corsOptions: cors.CorsOptions = {
    origin: [`//localhost:${WEB_PORT}`, `//${WEB_IP}:${WEB_PORT}`],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
serverApp.use(cors());
// webApp.use(timeout("1s"));

serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({ extended: true }));

serverApp.get("/api/getall", async (req: any, res: any) => {
    const data = await fetch(
        `http://${HUBITAT_IP}/apps/api/${APP_ID}/devices/all?access_token=${API_TOKEN}`
    );
    const jsonData = await data.json();

    res.send(jsonData);
});

serverApp.get("/api/save/:deviceid/:key/:value", async (req: any, res: any) => {
    const id = req.params.deviceid;
    const key = req.params.key;
    const value = req.params.value;
    console.log("Save /api/save/:deviceid/:key/:value");
    try {
        const data = await fetch(
            `http://${HUBITAT_IP}/apps/api/${APP_ID}/devices/${id}/${key}/${value}?access_token=${API_TOKEN}`
        );
        const jsonData = await data.json();
        res.send(jsonData);
        console.log(jsonData);
    } catch (e) {
        console.error(e);
    }
});

serverApp.get("/api/save/:deviceid/:key", async (req: any, res: any) => {
    const id = req.params.deviceid;
    const key = req.params.key;
    console.log("Save /api/save/:deviceid/:key");
    const data = await fetch(
        `http://${HUBITAT_IP}/apps/api/${APP_ID}/devices/${id}/${key}?access_token=${API_TOKEN}`
    );
    const jsonData = await data.json();
    res.send(jsonData);
});

/**
 *
 */
serverApp.post("/refresh", (req: any, res: any) => {
    const data = JSON.stringify(req.body.content);
    console.log(data);

    wsApp.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
});

serverApp.listen(SERVER_PORT, () =>
    console.log(`Web Listening on IP ${SERVER_IP} and PORT ${SERVER_PORT}`)
);

const wsApp = new WebSocket.Server({ port: WEBSOCKET_PORT });

wsApp.on("connection", function connection(ws) {
    console.log(`Connection established: `);
    ws.on("message", function incoming(message) {
        console.log("received: %s", message);
    });
});

// wsApp.on("message", function incoming(data) {
//     console.log(data);
// });
