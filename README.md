## 0x Subgraph Extractor

This repository provides a library that queries 0x events from a 0x-subgraph deployed on [The Graph](https://thegraph.com/).

Unlike the [0x-event-extractor](https://github.com/0xTracker/0x-event-extractor) or extracting event logs via the `getLogsAsync` method of [0x.js](https://github.com/0xProject/0x-monorepo/tree/development/packages/0x.js), this client does not require a server and allows event filtering beyond the indexed event arguments (i.e. `makerAddress`, `feeRecipientAddress`, `orderHash` for the Fill event).

Import this module and easily filter for the exchange event you need.

## Install

```bash
yarn add https://github.com/michaelhly/0x-subgraph-extractor
```

## Usage

You get started by constructing an instance of the HttpSubgraphClient

```js
import { HttpSubgraphClient } from "./node_modules/0x-subgraph-extractor/src/client";
const client = new HttpSubgraphClient();
```

### Get Fill Events

Get 50 fill events on version 2 of the 0x protocol, filtered by makerAssetData and takerAssetData

```js
const v2FillEvents = await client.getFilledOrdersV2Async(50, {
  // Filter arguments
  makerAssetDataV2: "...",
  takerAssetDataV2: "...",
  ...
});
```
Example output: 
```

  "data": {
    "filledOrders": [
      {
        "__typename": "FilledOrder",
        "feeRecipient": "0x8124071f810d533ff63de61d0c98db99eeb99d64",
        "id": "0x92287ef67032a57bd324a3b31b7c0af4f33c397ff77fcaa43e211b74eeb78bf8",
        "maker": "0xd964af361d1e6a7941126532b80fe5fcc726eefa",
        "makerAssetDataV2": "0xf47261b0000000000000000000000000e45b7cd82ac0f3f6cfc9ecd165b79d6f87ed2875",
        "makerAssetFilledAmount": "2712000000000000000000",
        "makerFeePaid": "0",
        "senderV2": "0x0681e844593a051e2882ec897ecd5444efe19ff2",
        "taker": "0x0681e844593a051e2882ec897ecd5444efe19ff2",
        "takerAssetDataV2": "0xf47261b0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "takerAssetFilledAmount": "2110010000000000",
        "takerFeePaid": "0"
      },
      {
        "__typename": "FilledOrder",
        "feeRecipient": "0x8124071f810d533ff63de61d0c98db99eeb99d64",
        "id": "0xba583c97f2dd534993b229329ff4bf851e6cf12ea15b889aafd1f288bee82f39",
        "maker": "0x322f68d55eab8e2e98e573519c60930797892d25",
        "makerAssetDataV2": "0xf47261b0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "makerAssetFilledAmount": "2768827972093705",
        "makerFeePaid": "0",
        "senderV2": "0x0681e844593a051e2882ec897ecd5444efe19ff2",
        "taker": "0x0681e844593a051e2882ec897ecd5444efe19ff2",
        "takerAssetDataV2": "0xf47261b0000000000000000000000000e45b7cd82ac0f3f6cfc9ecd165b79d6f87ed2875",
        "takerAssetFilledAmount": "2712000000000000000000",
        "takerFeePaid": "0"
      },
      ...
    ]
  },
  "loading": false,
  "networkStatus": 7,
  "stale": false
}
```

Get 50 fill events on version 1 of the 0x protocol, filtered by makerTokenAddress and takerTokenAddress

```js
const v1FillEvents = await client.getFilledOrdersV1Async(50, {
  // Filter arguments
  makerTokenAddrV1: "0x...",
  takerTokenAddrV1: "0x...",
  ...
});
```
Exmaple output: 
```
{
  "data": {
    "filledOrders": [
      {
        "__typename": "FilledOrder",
        "feeRecipient": "0x8124071f810d533ff63de61d0c98db99eeb99d64",
        "id": "0xc3171a2b2c16a60d8897149a9ebc507f111471e90329773261cbcf7b544885bb",
        "maker": "0x4d915ff84fce083159b1cf4af89ae7516dae5d00",
        "makerAssetFilledAmount": "11099445544559999867090",
        "makerFeePaid": "0",
        "makerTokenAddrV1": 0x...,
        "taker": "0x0681e844593a051e2882ec897ecd5444efe19ff2",
        "takerAssetFilledAmount": "11094177218198769",
        "takerFeePaid": "0",
        "takerTokenAddrV1": 0x...,
        "tokensV1": null
      },
      {
        "__typename": "FilledOrder",
        "feeRecipient": "0x8124071f810d533ff63de61d0c98db99eeb99d64",
        "id": "0xb543d91b8263ca4e6f0c2dcd47858c1575550737d067b55a7b2b56e97cc4551d",
        "maker": "0x1c1bc0e2bef88891ae51d9f718d572b4bb2351f3",
        "makerAssetFilledAmount": "11262288285006081",
        "makerFeePaid": "0",
        "makerTokenAddrV1": 0x...,
        "taker": "0x0681e844593a051e2882ec897ecd5444efe19ff2",
        "takerAssetFilledAmount": "11099445544559999867090",
        "takerFeePaid": "0",
        "takerTokenAddrV1": 0x...,
        "tokensV1": null
      },
      ...
    ]
  },
  "loading": false,
  "networkStatus": 7,
  "stale": false
}
```

### Get Cancel Events

Get 50 cancel events on version 2 of the 0x protocol, filtered by makerAssetData and takerAssetData

```js
const v2CancelEvents = await client.getCancelledOrdersV2Async(50, {
  // Filter arguments
  makerAssetDataV2: "...",
  takerAssetDataV2: "...",
  ...
});
```
Example output: 
```
{
  "data": {
    "cancelledOrders": [
      {
        "__typename": "CancelledOrder",
        "feeRecipient": "0x0000000000000000000000000000000000000000",
        "id": "0xf8bdd90394afc6d2c8c2da63fc447e42414811e024fb658a0ca46852adf748b8",
        "maker": "0x7284bfcad25b9d16c5bacf72783c8a16bde5763b",
        "makerAssetDataV2": "0xf47261b000000000000000000000000022365168c8705e95b2d08876c23a8c13e3ad72e2",
        "senderV2": "0x7284bfcad25b9d16c5bacf72783c8a16bde5763b",
        "takerAssetDataV2": "0xf47261b0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
      },
      {
        "__typename": "CancelledOrder",
        "feeRecipient": "0x0000000000000000000000000000000000000000",
        "id": "0xcd912c91059f1de6bb3aa6baa2c3d521a891723ea0120480f491287ed086a119",
        "maker": "0xbf8d14e03394eac425caa7ea6eb5de3fd766cfd4",
        "makerAssetDataV2": "0xf47261b0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "senderV2": "0xbf8d14e03394eac425caa7ea6eb5de3fd766cfd4",
        "takerAssetDataV2": "0xf47261b0000000000000000000000000e41d2489571d322189246dafa5ebde1f4699f498"
      },
      ...
    ]
  },
  "loading": false,
  "networkStatus": 7,
  "stale": false
}

```

Get 50 cancel events on version 1 of the 0x protocol, filtered by makerTokenAddress and takerTokenAddress

```js
const v1CancelEvents = await client.getCancelledOrdersV1Async(50, {
  // Filter arguments
  makerTokenAddrV1: "0x...",
  takerTokenAddrV1: "0x...",
  ...
});
```
Example output: 
```
{
  "data": {
    "cancelledOrders": [
      {
        "__typename": "CancelledOrder",
        "feeRecipient": "0x0000000000000000000000000000000000000000",
        "id": "0xf8bdd90394afc6d2c8c2da63fc447e42414811e024fb658a0ca46852adf748b8",
        "maker": "0x7284bfcad25b9d16c5bacf72783c8a16bde5763b",
        "makerTokenAddrV1": 0x...,
        "makerTokenAmountV1": 2000000000000000000,
        "takerTokenAddrV1": 0x...,
        "takerTokenAmountV1": 1000000000000000000,
        "tokensV1": null
      },
      {
        "__typename": "CancelledOrder",
        "feeRecipient": "0x0000000000000000000000000000000000000000",
        "id": "0xcd912c91059f1de6bb3aa6baa2c3d521a891723ea0120480f491287ed086a119",
        "maker": "0xbf8d14e03394eac425caa7ea6eb5de3fd766cfd4",
        "makerTokenAddrV1": 0x...,
        "makerTokenAmountV1": 1000000000000000000,
        "takerTokenAddrV1": 0x...,
        "takerTokenAmountV1": 2000000000000000000,
        "tokensV1": null
      },
      ...
    ]
  },
  "loading": false,
  "networkStatus": 7,
  "stale": false
}
```

## TODO
- Handle ordering and pagination
- Finish tests
- Write better docs
- Provide sandbox example usage
- A lot of other stuff needs to be done
