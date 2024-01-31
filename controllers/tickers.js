import { getTicker, getTickers } from "../jsondb/tickers.js";

export const tickerAll = async (req, res) => {
  const { search, limit, offset } = req.query;
  try {
    const data = await getTickers({ search, limit, offset });
    if (data) {
      res.send(data);
    } else {
      res.send({});
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const tickerOne = async (req, res) => {
  const { symbol } = req.params;
  try {
    const data = await getTicker({ symbol });
    if (data) {
      res.send(data);
    } else {
      res.send({});
    }
  } catch (err) {
    throw new Error(err);
  }
};
