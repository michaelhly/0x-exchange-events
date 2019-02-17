## 0x Subgraph Extractor

This repository provides a library that queries 0x events from a 0x-subgraph deployed on [The Graph](https://thegraph.com/).

Unlike the [0x-event-extractor](https://github.com/0xTracker/0x-event-extractor) or extracting event logs via the `getLogsAsync` method of [0x.js](https://github.com/0xProject/0x-monorepo/tree/development/packages/0x.js), this client does not require a server and allows event filtering beyond the indexed event arguments (i.e. `makerAddress`, `feeRecipientAddress`, `orderHash` for the Fill event).

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
  makerAssetDataV2: "....",
  takerAssetDataV2: "....",
  ...
});
```

Get 50 fill events on version 1 of the 0x protocol, filtered by makerTokenAddress and takerTokenAddress

```js
const v1FillEvents = await client.getFilledOrdersV1Async(50, {
  // Filter arguments
  makerTokenAddrV1: "0x....",
  takerTokenAddrV1: "0x....",
  ...
});
```

### Get Cancel Events

Get 50 cancel events on version 2 of the 0x protocol, filtered by makerAssetData and takerAssetData

```js
const v2CancelEvents = await client.getCancelledOrdersV2Async(50, {
  // Filter arguments
  makerAssetDataV2: "....",
  takerAssetDataV2: "....",
  ...
});
```

Get 50 cancel events on version 1 of the 0x protocol, filtered by makerTokenAddress and takerTokenAddress

```js
const v1CancelEvents = await client.getCancelledOrdersV1Async(50, {
  // Filter arguments
  makerTokenAddrV1: "0x....",
  takerTokenAddrV1: "0x....",
  ...
});
```

## TODO

- Handle ordering and pagination
- Finish tests
- Write better docs
- Provide sandbox example usage
- A lot of other stuff
