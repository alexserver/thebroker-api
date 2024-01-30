import { tickerRoutes } from "./tickers.js";
import { eodRoutes } from "./eod.js";

const appRouter = (app, fs) => {
  app.get("/", (req, res) => {
    res.send("welcome to the development api-server");
  });

  tickerRoutes(app, fs);

  eodRoutes(app, fs);
};

export default appRouter;
