# @coinset/ftx

Universal FTX API client

:children_crossing: This is not official

## Public API

A request for an entry point that does not require authentication.

### fetchMarket

Return type of market on FTX: spot, perpetual future, expiring future, and MOVE
contract. Examples for each type are `BTC/USD`, `BTC-PERP`, `BTC-0626`, and
`BTC-MOVE-1005`. For future that expired in 2019, prepend a `2019` to the date,
like so: `BTC-20190628` or `BTC-MOVE-20190923`.
[Docs](https://docs.ftx.com/?javascript#get-single-market)

example:

```ts
import { fetchMarket } from "https://deno.land/x/ftx@$VERSION/mod.ts";
await fetchMarket("BTC/USD");
```

parameter:

| name       | type     | required | description                                         |
| ---------- | -------- | -------- | --------------------------------------------------- |
| marketName | `string` | *        | e.g. `"BTC/USD"` for spot, `"BTC-PERP"` for futures |

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

type MarketResponse = {
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
  );
};
```

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

### fetchOrderBook

Retrieve order book of market name.
[Docs](https://docs.ftx.com/?javascript#get-orderbook)

example:

```ts
import { fetchOrderBook } from "https://deno.land/x/ftx@$VERSION/mod.ts";
await fetchOrderBook("BTC/USD");
```

parameter:

| name       | type                 | required | description                                         |
| ---------- | -------------------- | -------- | --------------------------------------------------- |
| marketName | `string`             | *        | e.g. `"BTC/USD"` for spot, `"BTC-PERP"` for futures |
| options    | `{ depth?: number }` |          | order book options                                  |

returns:

```ts
type OrderBookResponse = {
  success: true;
  result: {
    asks: [number, number][];
    bids: [number, number][];
  };
};
```

### fetchTrades

Retrieve list of trade history.
[Docs](https://docs.ftx.com/?javascript#get-trades)

example:

```ts
import { fetchTrades } from "https://deno.land/x/ftx@$VERSION/mod.ts";
await fetchTrades("BTC/USD");
```

parameter:

| name       | type                                       | required | description                                         |
| ---------- | ------------------------------------------ | -------- | --------------------------------------------------- |
| marketName | `string`                                   | *        | e.g. `"BTC/USD"` for spot, `"BTC-PERP"` for futures |
| options    | `{ startTime?: number, endTime?: number }` |          | trades options                                      |

returns:

```ts
type TradesResponse = {
  success: true;
  result: {
    id: number;
    liquidation: boolean;
    price: number;
    side: "buy" | "sell";
    size: number;
    time: Date;
  }[];
};
```

### fetchCandles

Historical prices of expired futures can be retrieved with this end point but
make sure to specify start time and end time.
[Docs](https://docs.ftx.com/?javascript#get-historical-prices)

example:

```ts
import { fetchCandles } from "https://deno.land/x/ftx@$VERSION/mod.ts";
await fetchCandles({ marketName: "BTC/USD", resolution: 300 });
```

parameter:

| name       | type                                       | required | description          |
| ---------- | ------------------------------------------ | -------- | -------------------- |
| candleArgs | `FetchCandles`                             | *        | required candle args |
| options    | `{ startTime?: number, endTime?: number }` |          | candle options       |

```ts
type FetchCandles = {
  marketName: string;
  resolution: (15 | 60 | 300 | 900 | 3600 | 14400 | 86400) | ({} & number);
};
```

returns:

```ts
type CandlesResponse = {
  success: true;
  result: {
    open: number;
    high: number;
    low: number;
    close: number;
    startTime: Date;
    volume: number;
    time: number;
  }[];
};
```
