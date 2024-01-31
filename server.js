import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";

const app = express();
const port = Number(process.env.API_DEFAULT_PORT ?? 1234);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
