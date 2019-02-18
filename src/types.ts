export interface Client {
  getFillEventsAsync(
    numEntries: number,
    requestOpts?: FillEventFilter
  ): Promise<any>;
  getCancelEventsAsync(
    numEntries: number,
    requestOpts?: CancelledEventFilter
  ): Promise<any>;
  getEventsByUsersAsync(numEntries: number): Promise<any>;
}

export interface FillEventFilter {
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

export interface CancelledEventFilter {
  id?: string;
  maker?: string;
  feeRecipient?: string;
  makerAssetDataV2?: string;
  takerAssetDataV2?: string;
  senderV2?: string;
}
