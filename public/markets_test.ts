import {
  anyArray,
  anyBoolean,
  anyNumber,
  anyOf,
  anyString,
  expect,
  test,
} from "../dev_deps.ts";
import { fetchMarkets } from "./markets.ts";

const baseEquality = {
  quoteVolume24h: anyNumber(),
  change1h: anyNumber(),
  change24h: anyNumber(),
  changeBod: anyNumber(),
  highLeverageFeeExempt: anyBoolean(),
  minProvideSize: anyNumber(),
  enabled: anyBoolean(),
  ask: anyOf([anyNumber(), null]),
  bid: anyOf([anyNumber(), null]),
  last: anyOf([anyNumber(), null]),
  postOnly: anyBoolean(),
  price: anyOf([anyNumber(), null]),
  priceIncrement: anyNumber(),
  sizeIncrement: anyNumber(),
  restricted: anyBoolean(),
  volumeUsd24h: anyNumber(),
};

const baseSpotEquality = {
  ...baseEquality,
  type: "spot",
  name: anyString((v) => /\w\/\w/.test(v)),
  baseCurrency: anyString(),
  quoteCurrency: anyString(),
  underlying: null,
};

const baseFutureEquality = {
  ...baseEquality,
  name: anyString(),
  type: "future",
  baseCurrency: null,
  quoteCurrency: null,
  underlying: anyString(),
};

export const dataEquality = anyOf([
  baseSpotEquality,
  {
    ...baseSpotEquality,
    tokenizedEquity: anyBoolean(),
  },
  baseFutureEquality,
  {
    ...baseFutureEquality,
    tokenizedEquity: anyBoolean(),
  },
]);

test("fetchMarkets", async () => {
  await expect(fetchMarkets()).resolves.toEqual({
    success: true,
    result: anyArray(
      dataEquality,
    ),
  });
});
