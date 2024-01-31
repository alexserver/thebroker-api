import { tickerRoutes } from "./tickers.js";
import { eodRoutes } from "./eod.js";

const appRouter = (app) => {
  app.get("/", (req, res) => {
    res.send("welcome to the development api-server");
  });

  tickerRoutes(app);

  eodRoutes(app);
};

export default appRouter;
