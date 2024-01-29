import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";
import fs from "node:fs";

const app = express();
const port = Number(process.env.API_DEFAULT_PORT ?? 1234);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app, fs);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
