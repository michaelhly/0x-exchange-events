export interface Client {
  getFilledOrdersV2Async(
    numEntries: number,
    requestOpts?: FilledOrderRequestOpts
  ): Promise<any>;
  getFilledOrdersV2Async(
    numEntries: number,
    requestOptsV1?: FilledOrderRequestOpts
  ): Promise<any>;
  getCancelledOrdersV1Async(
    numEntries: number,
    requestOpts?: CancelledOrderRequestOpts
  ): Promise<any>;
  getCancelledOrdersV2Async(
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
  makerTokenAddrV1?: string;
  takerTokenAddrV1?: string;
  tokenV1?: string;
}

export interface CancelledOrderRequestOpts {
  id: string;
  maker: string;
  feeRecipient: string;
  makerTokenAddrV1: string;
  takerTokenAddrV1: string;
  makerTokenAmountV1: string;
  takerTokenAmountV1: string;
  tokensV1: string;
  makerAssetDataV2?: string;
  takerAssetDataV2?: string;
  senderV2?: string;
}
