export interface Client {
  getFilledOrdersAsync(
    numEntries: number,
    requestOpts?: FilledOrderRequestOpts
  ): Promise<any>;
  getFilledOrdersAsync(
    numEntries: number,
    requestOpts?: FilledOrderRequestOpts
  ): Promise<any>;
  getCancelledOrdersAsync(
    numEntries: number,
    requestOpts?: CancelledOrderRequestOpts
  ): Promise<any>;
}

export interface FilledOrderRequestOpts {
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

export interface CancelledOrderRequestOpts {
  id?: string;
  maker?: string;
  feeRecipient?: string;
  makerAssetDataV2?: string;
  takerAssetDataV2?: string;
  senderV2?: string;
}
