import { getTickers } from "../jsondb/tickers.js";

export const tickerRoutes = (app, fs) => {
  // variables
  const dataPath = "./data/tickers.json";

  // READ
  app.get("/tickers", async (req, res) => {
    const { query } = req.query;
    try {
      const data = await getTickers({ query });
      res.send(data);
    } catch (ex) {
      throw new Error(ex);
    }
  });
};
