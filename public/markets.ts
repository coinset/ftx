import { BASE_URL } from "./constants.ts";
import { jsonFetch } from "./_utils.ts";
import { MarketData } from "./market.ts";

export type MarketsResponse = {
  success: true;
  result: MarketData[];
};

/** This section covers all types of markets on FTX: spot, perpetual futures, expiring futures, and MOVE contracts.
 * Examples for each type are `BTC/USD`, `BTC-PERP`, `BTC-0626`, and `BTC-MOVE-1005`. For futures that expired in 2019, prepend a `2019` to the date, like so: `BTC-20190628` or `BTC-MOVE-20190923`.
 * ```ts
 * import { fetchMarkets } from "https://deno.land/x/ftx@$VERSION/mod.ts"
 * await fetchMarkets()
 * ```
 * @see https://docs.ftx.com/?javascript#markets
 */
export function fetchMarkets(): Promise<MarketsResponse> {
  const url = new URL("markets", BASE_URL);

  return jsonFetch(url);
}
