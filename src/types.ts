export interface Client {
  getFilledOrdersAsync(
    numEntries: number,
    requestOpts?: FilledOrderFilter
  ): Promise<any>;
  getCancelledOrdersAsync(
    numEntries: number,
    requestOpts?: CancelledOrderFilter
  ): Promise<any>;
  getOrdersByUsersAsync(numEntries: number, userAddress: string): Promise<any>;
}

export interface FilledOrderFilter {
  id?: string;
  maker?: string;
  taker?: string;
  feeRecipient?: string;
  makerFeePaid?: string;
  takerFeePaid?: string;
  makerAssetFilledAmount?: string;
  takerAssetFilledAmount?: string;
  makerAssetDataV2?: string;
  takerAssetDataV2?: string;
  senderV2?: string;
}

export interface CancelledOrderFilter {
  id?: string;
  maker?: string;
  feeRecipient?: string;
  makerAssetDataV2?: string;
  takerAssetDataV2?: string;
  senderV2?: string;
}
