// this one reads data from JSON storage and simulates the filtered and sorted data from the API

import { readFile } from "node:fs/promises";

const API_REQUEST_LIMIT = process.env.API_REQUEST_LIMIT;

export const getTickers = async ({
  search,
  limit = API_REQUEST_LIMIT,
  offset = 0,
}) => {
  const path = new URL("../data/tickers.json", import.meta.url);
  try {
    const file = await readFile(path, { encoding: "utf8" });
    const db = JSON.parse(file);

    // filter by query
    const filtered = search
      ? db.data?.filter(
          (item) =>
            item.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
            item.symbol?.toLowerCase()?.includes(search?.toLowerCase()) ||
            item.stock_exchange?.country
              ?.toLowerCase()
              ?.includes(search?.toLowerCase()) ||
            item.stock_exchange?.name
              ?.toLowerCase()
              ?.includes(search?.toLowerCase()) ||
            item.stock_exchange?.acronym
              ?.toLowerCase()
              ?.includes(search?.toLowerCase())
        )
      : db.data;

    const data = filtered.slice(Number(offset), Number(limit) + Number(offset));

    const pagination = {
      limit,
      offset,
      count: data?.length,
      total: db.data?.length,
    };

    return { pagination, data };
  } catch (ex) {
    throw new Error(ex);
  }
};
