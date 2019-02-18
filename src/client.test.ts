import { assetDataUtils } from "@0x/order-utils";

import { HttpSubgraphClient } from "./client";
import { DEFAULT_PER_PAGE } from "./constants";
import { Client } from "./types";

describe("Tests for HttpSubgraphClient", () => {
  let client: Client = null;
  beforeAll(() => {
    client = new HttpSubgraphClient();
  });

  it("test getFillEventsAsync, filter by feeRecipient", async () => {
    const expectedFeeRecipient = "0x8124071f810d533ff63de61d0c98db99eeb99d64";
    const eventLog = await client.getFillEventsAsync(DEFAULT_PER_PAGE, {
      feeRecipient: expectedFeeRecipient
    });
    const { filledOrders } = eventLog.data;
    expect(filledOrders.length).toBe(DEFAULT_PER_PAGE);
    filledOrders.forEach(order => {
      expect(order.feeRecipient).toBe(expectedFeeRecipient);
    });
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
    const { filledOrders } = eventLog.data;
    expect(filledOrders.length).toBe(DEFAULT_PER_PAGE);
    filledOrders.forEach(order => {
      expect(order.makerAssetDataV2).toBe(expectedMakerAssetData);
      expect(order.takerAssetDataV2).toBe(expectedTakerAssetData);
    });
  });

  it("test getCancelEventAsync, filter by feeRecipient", async () => {
    const expectedFeeRecipient = "0x8124071f810d533ff63de61d0c98db99eeb99d64";
    const eventLog = await client.getCancelEventsAsync(DEFAULT_PER_PAGE, {
      feeRecipient: expectedFeeRecipient
    });
    const { cancelledOrders } = eventLog.data;
    expect(cancelledOrders.length).toBe(DEFAULT_PER_PAGE);
    cancelledOrders.forEach(order => {
      expect(order.feeRecipient).toBe(expectedFeeRecipient);
    });
  });

  it("test getFillEventsAsync, filter by assetData", async () => {
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
    const { cancelledOrders } = eventLog.data;
    expect(cancelledOrders.length).toBe(DEFAULT_PER_PAGE);
    cancelledOrders.forEach(order => {
      expect(order.makerAssetDataV2).toBe(expectedMakerAssetData);
      expect(order.takerAssetDataV2).toBe(expectedTakerAssetData);
    });
  });
});
