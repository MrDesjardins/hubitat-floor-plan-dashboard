import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/users/:id", (req: any, res: any) => {
    const id = req.params.id;
    res.send({ express: `Requested data for user ID: ${id}` });
});

app.post("/refresh", (req: any, res: any) => {
    console.log(req.body);
    res.send({ express: `Requested data for user ID` });
});

app.get("/refresh2", (req: any, res: any) => {
    console.log(res.body);
    res.send({ express: `Requested data for user ID` });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
