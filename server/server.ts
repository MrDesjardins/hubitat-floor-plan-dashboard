import bodyParser from "body-parser";
import express from "express";
import WebSocket from "ws";

const webApp = express();
const webPort = process.env.PORT || 5000;

webApp.use(bodyParser.json());
webApp.use(bodyParser.urlencoded({ extended: true }));

// webApp.get("/api/users/:id", (req: any, res: any) => {
//     const id = req.params.id;
//     res.send({ express: `Requested data for user ID: ${id}` });
// });

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
