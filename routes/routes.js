import { authMiddleware } from "./auth.js";
import { eodOne, eodAll } from "../controllers/eod.js";
import { tickerOne, tickerAll } from "../controllers/tickers.js";

const appRouter = (app) => {
  app.get("/", (req, res) => {
    res.send("welcome to the development api-server");
  });

  app.get("/tickers", [authMiddleware, tickerAll]);

  app.get("/tickers/:symbol", [authMiddleware, tickerOne]);

  app.get("/tickers/:symbol/eod/:when", [authMiddleware, eodOne]);

  app.get("/eod", [authMiddleware, eodAll]);
};

export default appRouter;
