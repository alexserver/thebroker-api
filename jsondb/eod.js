import { readFile } from "node:fs/promises";
import { isEqual, parseISO, isAfter, isBefore } from "date-fns";

const API_REQUEST_LIMIT = process.env.API_REQUEST_LIMIT;
const FILENAME = "../data/eod.json";

export const getTickerEod = async ({ symbol, when }) => {
  const path = new URL(FILENAME, import.meta.url);
  try {
    const file = await readFile(path, { encoding: "utf8" });
    const db = JSON.parse(file);
    const ticker = db.data?.find(
      (item) => item?.symbol?.toLowerCase() === symbol.toLowerCase()
    );
    if (!ticker) return null;
    // else
    const record = ticker?.eod?.data?.find((item) =>
      isEqual(parseISO(item.date), when)
    );
    if (record) return record;
    // else return null
    return null;
  } catch (err) {
    throw new Error(err);
  }
};

export const getEodHistory = async ({ symbols, date_from, date_to }) => {
  const limit = API_REQUEST_LIMIT;
  const offset = 0;
  const path = new URL(FILENAME, import.meta.url);
  try {
    const file = await readFile(path, { encoding: "utf-8" });
    const db = JSON.parse(file);
    const ticker = db.data?.find(
      (item) => item?.symbol?.toLowerCase() === symbols.toLowerCase()
    );
    if (!ticker) return null;
    const filtered = ticker.eod?.data.filter(
      (item) => isAfter(item?.date, date_from) && isBefore(item?.date, date_to)
    );
    const data = filtered.slice(offset, Number(limit));

    const pagination = {
      limit,
      offset,
      count: data?.length,
      total: ticker?.eod?.data?.length,
    };
    return { pagination, data };
  } catch (err) {
    throw new Error(err);
  }
};
