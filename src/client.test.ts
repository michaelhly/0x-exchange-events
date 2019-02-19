import { assetDataUtils } from "@0x/order-utils";

import { HttpSubgraphClient } from "./client";
import { DEFAULT_PER_PAGE } from "./constants";
import { CancelEvents, Client, FillEvents } from "./types";

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
    expect(eventLog.totalEntries).toBe(DEFAULT_PER_PAGE);
    const { fillEvents } = eventLog.data;
    expect(fillEvents.length).toBe(DEFAULT_PER_PAGE);
    fillEvents.forEach(order => {
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
    expect(eventLog.totalEntries).toBe(DEFAULT_PER_PAGE);
    const { fillEvents } = eventLog.data;
    expect(fillEvents.length).toBe(DEFAULT_PER_PAGE);
    fillEvents.forEach(order => {
      expect(order.makerAssetDataV2).toBe(expectedMakerAssetData);
      expect(order.takerAssetDataV2).toBe(expectedTakerAssetData);
    });
  });

  it("test getFillEventsAsync, pagination", async () => {
    const expectedMakerAssetData = assetDataUtils.encodeERC20AssetData(
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    ); // WETH
    const expectedTakerAssetData = assetDataUtils.encodeERC20AssetData(
      "0xe41d2489571d322189246dafa5ebde1f4699f498"
    ); // ZRX
    const eventLog1: FillEvents = await client.getFillEventsAsync(
      DEFAULT_PER_PAGE,
      {
        makerAssetDataV2: expectedMakerAssetData,
        takerAssetDataV2: expectedTakerAssetData
      }
    );
    expect(eventLog1.totalEntries).toBe(DEFAULT_PER_PAGE);
    const filledOrders1 = eventLog1.data.fillEvents;
    const eventLog2: FillEvents = await client.getFillEventsAsync(
      DEFAULT_PER_PAGE,
      {
        makerAssetDataV2: expectedMakerAssetData,
        takerAssetDataV2: expectedTakerAssetData
      },
      eventLog1.totalEntries
    );
    expect(eventLog2.totalEntries).toBe(DEFAULT_PER_PAGE);
    const filledOrders2 = eventLog2.data.fillEvents;
    for (let i = 0; i < DEFAULT_PER_PAGE; i++) {
      expect(filledOrders1[i].makerAssetDataV2).toBe(expectedMakerAssetData);
      expect(filledOrders1[i].takerAssetDataV2).toBe(expectedTakerAssetData);
      expect(filledOrders2[i].makerAssetDataV2).toBe(expectedMakerAssetData);
      expect(filledOrders2[i].takerAssetDataV2).toBe(expectedTakerAssetData);
      expect(filledOrders1[i].id).not.toBe(filledOrders2[i].id);
    }
  });

  it("test getCancelEventAsync, filter by feeRecipient", async () => {
    const expectedFeeRecipient = "0x8124071f810d533ff63de61d0c98db99eeb99d64";
    const eventLog: CancelEvents = await client.getCancelEventsAsync(
      DEFAULT_PER_PAGE,
      {
        feeRecipient: expectedFeeRecipient
      }
    );
    expect(eventLog.totalEntries).toBe(DEFAULT_PER_PAGE);
    const { cancelEvents } = eventLog.data;
    expect(cancelEvents.length).toBe(DEFAULT_PER_PAGE);
    cancelEvents.forEach(order => {
      expect(order.feeRecipient).toBe(expectedFeeRecipient);
    });
  });

  it("test getCancelEventAsync, filter by assetData", async () => {
    const expectedMakerAssetData = assetDataUtils.encodeERC20AssetData(
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    ); // WETH
    const expectedTakerAssetData = assetDataUtils.encodeERC20AssetData(
      "0xe41d2489571d322189246dafa5ebde1f4699f498"
    ); // ZRX
    const eventLog: CancelEvents = await client.getCancelEventsAsync(
      DEFAULT_PER_PAGE,
      {
        makerAssetDataV2: expectedMakerAssetData,
        takerAssetDataV2: expectedTakerAssetData
      }
    );
    expect(eventLog.totalEntries).toBe(DEFAULT_PER_PAGE);
    const { cancelEvents } = eventLog.data;
    expect(cancelEvents.length).toBe(DEFAULT_PER_PAGE);
    cancelEvents.forEach(order => {
      expect(order.makerAssetDataV2).toBe(expectedMakerAssetData);
      expect(order.takerAssetDataV2).toBe(expectedTakerAssetData);
    });
  });

  it("test getFillEventsAsync, pagination", async () => {
    const expectedMakerAssetData = assetDataUtils.encodeERC20AssetData(
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    ); // WETH
    const expectedTakerAssetData = assetDataUtils.encodeERC20AssetData(
      "0xe41d2489571d322189246dafa5ebde1f4699f498"
    ); // ZRX
    const eventLog1: CancelEvents = await client.getCancelEventsAsync(
      DEFAULT_PER_PAGE,
      {
        makerAssetDataV2: expectedMakerAssetData,
        takerAssetDataV2: expectedTakerAssetData
      }
    );
    expect(eventLog1.totalEntries).toBe(DEFAULT_PER_PAGE);
    const cancelledOrders1 = eventLog1.data.cancelEvents;
    const eventLog2: CancelEvents = await client.getCancelEventsAsync(
      DEFAULT_PER_PAGE,
      {
        makerAssetDataV2: expectedMakerAssetData,
        takerAssetDataV2: expectedTakerAssetData
      },
      eventLog1.totalEntries
    );
    expect(eventLog2.totalEntries).toBe(DEFAULT_PER_PAGE);
    const cancelledOrders2 = eventLog2.data.cancelEvents;
    for (let i = 0; i < DEFAULT_PER_PAGE; i++) {
      expect(cancelledOrders1[i].makerAssetDataV2).toBe(expectedMakerAssetData);
      expect(cancelledOrders1[i].takerAssetDataV2).toBe(expectedTakerAssetData);
      expect(cancelledOrders2[i].makerAssetDataV2).toBe(expectedMakerAssetData);
      expect(cancelledOrders2[i].takerAssetDataV2).toBe(expectedTakerAssetData);
      expect(cancelledOrders1[i].id).not.toBe(cancelledOrders2[i].id);
    }
  });
});
