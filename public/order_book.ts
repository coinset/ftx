import { BASE_URL } from "./constants.ts";
import { jsonFetch } from "./_utils.ts";
import { isNumber } from "../deps.ts";

export type OrderBookResponse = {
  success: true;
  result: {
    /** Array with price and size */
    asks: [number, number][];

    /** Array with price and size */
    bids: [number, number][];
  };
};

export type OrderBookOptions = {
  /** Maximum is `100`
   * @default 20
   */
  depth?: number;
};

/** Retrieve order book of market name.
 * ```ts
 * import { fetchOrderBook } from "https://deno.land/x/ftx@$VERSION/mod.ts";
 * await fetchOrderBook("BTC/USD");
 * ```
 * @see https://docs.ftx.com/?javascript#get-orderbook
 */
export function fetchOrderBook(
  marketName: string,
  { depth }: OrderBookOptions = {},
): Promise<OrderBookResponse> {
  const url = new URL(`markets/${marketName}/orderbook`, BASE_URL);

  if (isNumber(depth)) {
    url.searchParams.set("depth", String(depth));
  }

  return jsonFetch(url);
}
