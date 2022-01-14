import { BASE_URL } from "./constants.ts";
import { jsonFetch } from "./_utils.ts";

type BaseMarketData = {
  quoteVolume24h: number;

  /** Change in the past hour */
  change1h: number;

  /** Change in the past 24 hours */
  change24h: number;

  /** Change since start of day (00:00 UTC) */
  changeBod: number;

  highLeverageFeeExempt: boolean;

  /** Minimum maker order size (if >10 orders per hour fall below this size) */
  minProvideSize: number;

  enabled: boolean;

  /** best ask */
  ask: number | null;

  /** best bid */
  bid: number | null;

  /** last traded price */
  last: number | null;

  /** current price */
  price: number | null;

  /** if the market is in post-only mode (all orders get modified to be post-only, in addition to other settings they may have) */
  postOnly: boolean;

  priceIncrement: number;
  sizeIncrement: number;

  /** if the market has nonstandard restrictions on which jurisdictions can trade it */
  restricted: boolean;

  /** USD volume in past 24 hours */
  volumeUsd24h: number;
  tokenizedEquity?: boolean;
};

export type MarketsResponse = {
  success: true;
  result: (
    & BaseMarketData
    & ({
      /** e.g. `"BTC/USD"` */
      name: `${string}/${string}`;
      baseCurrency: string;
      quoteCurrency: string;
      underlying: null;
      type: "spot";
    } | {
      name: string;
      baseCurrency: null;
      quoteCurrency: null;
      underlying: string;
      type: "future";
    })
  )[];
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
