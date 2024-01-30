import { readFile } from "node:fs/promises";
import { isEqual, format, parseISO } from "date-fns";

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
