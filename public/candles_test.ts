import { any, anyArray, anyNumber, expect, test } from "../dev_deps.ts";
import { fetchCandles } from "./candles.ts";

test("fetchCandles", async () => {
  await expect(fetchCandles({ marketName: "BTC/USD", resolution: 300 }))
    .resolves.toEqual({
      success: true,
      result: anyArray({
        close: anyNumber(),
        high: anyNumber(),
        low: anyNumber(),
        open: anyNumber(),
        volume: anyNumber(),
        startTime: any(Date),
        time: anyNumber(),
      }),
    });
});
