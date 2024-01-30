import { getEodHistory, getTickerEod } from "../jsondb/eod.js";

export const eodRoutes = async (app, fs) => {
  app.get("/tickers/:symbol/eod/:when", async (req, res) => {
    const { symbol, when } = req.params;
    const data = await getTickerEod({ symbol, when });
    if (data) {
      res.send(data);
    } else {
      res.send({});
    }
    return;
  });

  app.get("/eod", async (req, res) => {
    const { symbols, date_from, date_to } = req.query;
    const data = await getEodHistory({ symbols, date_from, date_to });
    if (data) {
      res.send(data);
    } else {
      res.send({});
    }
    return;
  });
};
