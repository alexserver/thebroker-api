import { tickerRoutes } from "./tickers.js";

const appRouter = (app, fs) => {
  app.get("/", (req, res) => {
    res.send("welcome to the development api-server");
  });

  tickerRoutes(app, fs);
};

export default appRouter;
