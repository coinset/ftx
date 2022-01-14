import {
  any,
  anyArray,
  anyBoolean,
  anyNumber,
  anyOf,
  expect,
  test,
} from "../dev_deps.ts";
import { fetchTrades } from "./trades.ts";

test("fetchTrades", async () => {
  await expect(fetchTrades("BTC/USD")).resolves
    .toEqual({
      success: true,
      result: anyArray({
        id: anyNumber(),
        liquidation: anyBoolean(),
        price: anyNumber(),
        side: anyOf(["buy", "sell"]),
        size: anyNumber(),
        time: any(Date),
      }),
    });
});
