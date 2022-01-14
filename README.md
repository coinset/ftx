# @coinset/ftx

Universal FTX API client

:children_crossing: This is not official

## Public API

A request for an entry point that does not require authentication.

### fetchMarkets

This section covers all types of markets on FTX: spot, perpetual futures,
expiring futures, and MOVE contracts. Examples for each type are `BTC/USD`,
`BTC-PERP`, `BTC-0626`, and `BTC-MOVE-1005`. For futures that expired in 2019,
prepend a `2019` to the date, like so: `BTC-20190628` or `BTC-MOVE-20190923`.
[Docs](https://docs.ftx.com/?javascript#markets)

example:

```ts
import { fetchMarkets } from "https://deno.land/x/ftx@$VERSION/mod.ts";
await fetchMarkets();
```

returns:

```ts
type BaseMarketData = {
  quoteVolume24h: number;
  change1h: number;
  change24h: number;
  changeBod: number;
  highLeverageFeeExempt: boolean;
  minProvideSize: number;
  enabled: boolean;
  ask: number | null;
  bid: number | null;
  last: number | null;
  price: number | null;
  postOnly: boolean;
  priceIncrement: number;
  sizeIncrement: number;
  restricted: boolean;
  volumeUsd24h: number;
  tokenizedEquity?: boolean | undefined;
};

type MarketsResponse = {
  success: true;
  result: (
    & BaseMarketData
    & ({
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
```
