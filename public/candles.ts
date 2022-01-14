import { BASE_URL } from "./constants.ts";
import { jsonFetch, Reviver } from "./_utils.ts";
import { isNumber, isString } from "../deps.ts";

export type CandlesResponse = {
  success: true;
  result: {
    /** mark price at startTime */
    open: number;

    /** highest mark price over the window */
    high: number;

    /** lowest mark price over the window */
    low: number;

    /** mark price at the end of the window: startTime + resolution */
    close: number;

    /** start time of the window */
    startTime: Date;

    /** volume traded in the window */
    volume: number;
    time: number;
  }[];
};

export type FetchCandles = {
  /** name of the market */
  marketName: string;

  /** window length in seconds. */
  // deno-lint-ignore ban-types
  resolution: (15 | 60 | 300 | 900 | 3600 | 14400 | 86400) | ({} & number);
};

export type CandleOptions = {
  /** filter starting time in seconds */
  startTime?: number;

  /** filter ending time in seconds */
  endTime?: number;
};

const reviver: Reviver = (key, value) => {
  if (key === "startTime" && isString(value)) {
    return new Date(Date.parse(value));
  }
  return value;
};

/** Historical prices of expired futures can be retrieved with this end point but make sure to specify start time and end time.
 * ```ts
 * import { fetchCandles } from "https://deno.land/x/ftx@$VERSION/mod.ts";
 * await fetchCandles({ marketName: "BTC/USD", resolution: 300 });
 * ```
 * @see https://docs.ftx.com/?javascript#get-historical-prices
 */
export function fetchCandles(
  { marketName, resolution }: FetchCandles,
  { startTime, endTime }: CandleOptions = {},
  init?: RequestInit,
): Promise<CandlesResponse> {
  const url = new URL(`markets/${marketName}/candles`, BASE_URL);

  url.searchParams.set("resolution", String(resolution));

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
