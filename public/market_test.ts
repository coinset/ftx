import { expect, test } from "../dev_deps.ts";
import { fetchMarket } from "./market.ts";
import { dataEquality } from "./markets_test.ts";

test("fetchMarkets", async () => {
  await expect(fetchMarket("BTC/USD")).resolves.toEqual({
    success: true,
    result: dataEquality,
  });
});
