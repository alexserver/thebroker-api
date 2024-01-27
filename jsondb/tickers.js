// this one reads data from JSON storage and simulates the filtered and sorted data from the API

import { readFile } from "node:fs/promises";

export const getTickers = async ({ query, limit = 100, offset = 0 }) => {
  const path = new URL("../data/tickers.json", import.meta.url);
  try {
    const file = await readFile(path, { encoding: "utf8" });
    const db = JSON.parse(file);

    // filter by query
    const filtered = db.data?.filter(
      (item) =>
        item.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
        item.symbol?.toLowerCase()?.includes(query?.toLowerCase()) ||
        item.stock_exchange?.country
          ?.toLowerCase()
          ?.includes(query?.toLowerCase()) ||
        item.stock_exchange?.name
          ?.toLowerCase()
          ?.includes(query?.toLowerCase()) ||
        item.stock_exchange?.acronym
          ?.toLowerCase()
          ?.includes(query?.toLowerCase())
    );

    const pagination = {
      limit,
      offset,
      count: filtered?.length,
      total: db.data?.length,
    };

    return { pagination, data: filtered };
  } catch (ex) {
    throw new Error(ex);
  }
};
