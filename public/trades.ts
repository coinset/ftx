import { BASE_URL } from "./constants.ts";
import { jsonFetch, Reviver } from "./_utils.ts";
import { isNumber, isString } from "../deps.ts";

export type TradesResponse = {
  success: true;
  result: {
    /** trade id */
    id: number;

    /** if this trade involved a liquidation order */
    liquidation: boolean;

    price: number;
    side: "buy" | "sell";
    size: number;
    time: Date;
  }[];
};

export type TradesOptions = {
  startTime?: number;
  endTime?: number;
};

const reviver: Reviver = (key, value) => {
  if (key === "time" && isString(value)) {
    return new Date(Date.parse(value));
  }
  return value;
};

/** Retrieve list of trade history.
 * ```ts
 * import { fetchTrades } from "https://deno.land/x/ftx@$VERSION/mod.ts";
 * await fetchTrades("BTC/USD");
 * ```
 * @see https://docs.ftx.com/?javascript#get-trades
 */
export function fetchTrades(
  marketName: string,
  { startTime, endTime }: TradesOptions = {},
  init?: RequestInit,
): Promise<TradesResponse> {
  const url = new URL(`markets/${marketName}/trades`, BASE_URL);

  if (isNumber(startTime)) {
    url.searchParams.set("start_time", String(startTime));
  }

  if (isNumber(endTime)) {
    url.searchParams.set("end_time", String(endTime));
  }

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
