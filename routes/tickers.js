import { getTickers } from "../jsondb/tickers.js";

export const tickerRoutes = (app, fs) => {
  // variables
  const dataPath = "./data/tickers.json";

  // READ
  // Params:
  // search: string; a string to search and compare against symbol, name, stock exchange name, and stock exchange country
  // limit: string; the number of rows to fetch
  // offset: string; the starting point to fetch rows
  app.get("/tickers", async (req, res) => {
    const { search, limit, offset } = req.query;
    try {
      const data = await getTickers({ search, limit, offset });
      res.send(data);
    } catch (ex) {
      throw new Error(ex);
    }
  });
};
