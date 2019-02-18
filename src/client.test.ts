import { assetDataUtils } from "@0x/order-utils";

import { HttpSubgraphClient } from "./client";
import { DEFAULT_PER_PAGE } from "./constants";
import { Client, FillEvents } from "./types";

describe("Tests for HttpSubgraphClient", () => {
  let client: Client = null;
  beforeAll(() => {
    client = new HttpSubgraphClient();
  });

  it("test getFillEventsAsync, filter by feeRecipient", async () => {
    const expectedFeeRecipient = "0x8124071f810d533ff63de61d0c98db99eeb99d64";
    const eventLog: FillEvents = await client.getFillEventsAsync(
      DEFAULT_PER_PAGE,
      {
        feeRecipient: expectedFeeRecipient
      }
    );

    const { fillEvents } = eventLog.data;

    expect(fillEvents.length).toBe(DEFAULT_PER_PAGE);
    fillEvents.forEach(order => {
      expect(order.feeRecipient).toBe(expectedFeeRecipient);
    });
    const { pageInfo } = eventLog;
    expect(pageInfo.cursor).toBe(fillEvents[fillEvents.length - 1].id);
    expect(pageInfo.perPage).toBe(DEFAULT_PER_PAGE);
  });

  it("test getFillEventsAsync, filter by assetData", async () => {
    const expectedMakerAssetData = assetDataUtils.encodeERC20AssetData(
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    ); // WETH
    const expectedTakerAssetData = assetDataUtils.encodeERC20AssetData(
      "0xe41d2489571d322189246dafa5ebde1f4699f498"
    ); // ZRX
    const eventLog = await client.getFillEventsAsync(DEFAULT_PER_PAGE, {
      makerAssetDataV2: expectedMakerAssetData,
      takerAssetDataV2: expectedTakerAssetData
    });
    const { fillEvents } = eventLog.data;
    expect(fillEvents.length).toBe(DEFAULT_PER_PAGE);
    fillEvents.forEach(order => {
      expect(order.makerAssetDataV2).toBe(expectedMakerAssetData);
      expect(order.takerAssetDataV2).toBe(expectedTakerAssetData);
    });
    const { pageInfo } = eventLog;
    expect(pageInfo.cursor).toBe(fillEvents[fillEvents.length - 1].id);
    expect(pageInfo.perPage).toBe(DEFAULT_PER_PAGE);
  });

  /*
  it("test getFillEventsAsync, pagination", async () => {
    const expectedMakerAssetData = assetDataUtils.encodeERC20AssetData(
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    ); // WETH
    const expectedTakerAssetData = assetDataUtils.encodeERC20AssetData(
      "0xe41d2489571d322189246dafa5ebde1f4699f498"
    ); // ZRX
    const eventLog1: FillEvents = await client.getFillEventsAsync(3, {
      makerAssetDataV2: expectedMakerAssetData,
      takerAssetDataV2: expectedTakerAssetData
    });
    const filledOrders1 = eventLog1.data.fillEvents;
    expect(filledOrders1).toBe(1);
    const cursor1 = eventLog1.pageInfo.cursor;
    expect(cursor1).toBe(filledOrders1[filledOrders1.length - 1].id);
    const eventLog2: FillEvents = await client.getFillEventsAsync(
      3,
      {
        makerAssetDataV2: expectedMakerAssetData,
        takerAssetDataV2: expectedTakerAssetData
      },
      cursor1
    );
    const filledOrders2 = eventLog2.data.fillEvents;
    expect(filledOrders2).toBe(1);
    const cursor2 = eventLog2.pageInfo.cursor;
    expect(cursor2).toBe(filledOrders2[filledOrders2.length - 1].id);
    expect(cursor2).not.toBe(cursor1);
    for (let i = 0; i < DEFAULT_PER_PAGE; i++) {
      expect(filledOrders1[i].makerAssetDataV2).toBe(expectedMakerAssetData);
      expect(filledOrders1[i].takerAssetDataV2).toBe(expectedTakerAssetData);
      expect(filledOrders2[i].makerAssetDataV2).toBe(expectedMakerAssetData);
      expect(filledOrders2[i].takerAssetDataV2).toBe(expectedTakerAssetData);
      expect(filledOrders1[i].id).not.toBe(filledOrders2[i].id);
    }
  });
  */

  it("test getCancelEventAsync, filter by feeRecipient", async () => {
    const expectedFeeRecipient = "0x8124071f810d533ff63de61d0c98db99eeb99d64";
    const eventLog = await client.getCancelEventsAsync(DEFAULT_PER_PAGE, {
      feeRecipient: expectedFeeRecipient
    });
    const { cancelEvents } = eventLog.data;
    expect(cancelEvents.length).toBe(DEFAULT_PER_PAGE);
    cancelEvents.forEach(order => {
      expect(order.feeRecipient).toBe(expectedFeeRecipient);
    });
    const { pageInfo } = eventLog;
    expect(pageInfo.cursor).toBe(cancelEvents[cancelEvents.length - 1].id);
    expect(pageInfo.perPage).toBe(DEFAULT_PER_PAGE);
  });

  it("test getCancelEventAsync, filter by assetData", async () => {
    const expectedMakerAssetData = assetDataUtils.encodeERC20AssetData(
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    ); // WETH
    const expectedTakerAssetData = assetDataUtils.encodeERC20AssetData(
      "0xe41d2489571d322189246dafa5ebde1f4699f498"
    ); // ZRX
    const eventLog = await client.getCancelEventsAsync(DEFAULT_PER_PAGE, {
      makerAssetDataV2: expectedMakerAssetData,
      takerAssetDataV2: expectedTakerAssetData
    });
    const { cancelEvents } = eventLog.data;
    expect(cancelEvents.length).toBe(DEFAULT_PER_PAGE);
    cancelEvents.forEach(order => {
      expect(order.makerAssetDataV2).toBe(expectedMakerAssetData);
      expect(order.takerAssetDataV2).toBe(expectedTakerAssetData);
    });
    const { pageInfo } = eventLog;
    expect(pageInfo.cursor).toBe(cancelEvents[cancelEvents.length - 1].id);
    expect(pageInfo.perPage).toBe(DEFAULT_PER_PAGE);
  });
});
