import { anyArray, anyNumber, expect, test } from "../dev_deps.ts";
import { fetchOrderBook } from "./order_book.ts";

test("fetchOrderBook", async () => {
  await expect(fetchOrderBook("BTC/USD")).resolves.toEqual({
    success: true,
    result: {
      bids: anyArray([anyNumber(), anyNumber()]),
      asks: anyArray([anyNumber(), anyNumber()]),
    },
  });
});
