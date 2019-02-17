import { HttpSubgraphClient } from "./client";
import { Client } from "./types";

describe("Tests for HttpSubgraphClient", () => {
  let client: Client = null;
  beforeAll(() => {
    client = new HttpSubgraphClient();
  });

  it("test getFilledOrdersAsync", async () => {
    const filledOrders = await client.getFilledOrdersV2Async(2, {
      feeRecipient: "0xe269e891a2ec8585a378882ffa531141205e9"
    });

    // TODO: Tests
  });
});
