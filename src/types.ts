import { ApolloQueryResult } from "apollo-boost";

import { BigNumber } from "./configured_bignumber";

export interface FillEvent {
  __typename: string;
  feeRecipient: string;
  id: string;
  maker: string;
  makerAssetDataV2: string;
  makerAssetFilledAmount: string;
  makerFeePaid: string;
  senderV2: string;
  taker: string;
  takerAssetDataV2: string;
  takerAssetFilledAmount: string;
  takerFeePaid: string;
}

export interface CancelEvent {
  __typename: string;
  feeRecipient: string;
  id: string;
  maker: string;
  makerAssetDataV2: string;
  senderV2: string;
  takerAssetDataV2: string;
}

export interface FillEvents
  extends ApolloQueryResult<{ fillEvents: FillEvent[] }> {
  totalEntries?: number;
}

export interface CancelEvents
  extends ApolloQueryResult<{ cancelEvents: CancelEvent[] }> {
  totalEntries?: number;
}

export interface CancelEventFilter {
  maker?: string;
  maker_not?: string;
  maker_in?: string[];
  maker_not_in?: string[];
  maker_contains?: string;
  maker_not_contains?: string;
  feeRecipient?: string;
  feeRecipient_not?: string;
  feeRecipient_in?: string[];
  feeRecipient_not_in?: string[];
  feeRecipient_contains?: string;
  feeRecipient_not_contains?: string;
  id?: string;
  id_not?: string;
  id_gt?: string;
  id_lt?: string;
  id_gte?: string;
  id_lte?: string;
  id_in?: string[];
  id_not_in?: string[];
  makerAssetDataV2?: string;
  makerAssetDataV2_not?: string;
  makerAssetDataV2_in?: string[];
  makerAssetDataV2_not_in?: string[];
  makerAssetDataV2_contains?: string;
  makerAssetDataV2_not_contains?: string;
  takerAssetDataV2?: string;
  takerAssetDataV2_not?: string;
  takerAssetDataV2_in?: string[];
  takerAssetDataV2_not_in?: string[];
  takerAssetDataV2_contains?: string;
  takerAssetDataV2_not_contains?: string;
}

export interface FillEventFilter {
  maker?: string;
  maker_not?: string;
  maker_in?: string[];
  maker_not_in?: string[];
  maker_container?: string;
  maker_not_contains?: string;
  feeRecipient?: string;
  feeRecipient_not?: string;
  feeRecipient_in?: string[];
  feeRecipient_not_in?: string[];
  feeRecipient_contains?: string;
  feeRecipient_not_contains?: string;
  taker_not?: string;
  taker_in?: string[];
  taker_not_in?: string[];
  taker_contains?: string;
  taker_not_contains?: string;
  makerFeePaid?: BigNumber;
  makerFeePaid_not?: BigNumber;
  makerFeePaid_gt?: BigNumber;
  makerFeePaid_lt?: BigNumber;
  makerFeePaid_gte?: BigNumber;
  makerFeePaid_lte?: BigNumber;
  makerFeePaid_in?: BigNumber[];
  makerFeePaid_not_in?: BigNumber[];
  takerFeePaid?: BigNumber;
  takerFeePaid_not?: BigNumber;
  takerFeePaid_gt?: BigNumber;
  takerFeePaid_lt?: BigNumber;
  takerFeePaid_gte?: BigNumber;
  takerFeePaid_lte?: BigNumber;
  takerFeePaid_in?: BigNumber[];
  takerFeePaid_not_in?: BigNumber[];
  id?: string;
  id_not?: string;
  id_gt?: string;
  id_lt?: string;
  id_gte?: string;
  id_lte?: string;
  id_in?: string[];
  id_not_in?: string[];
  makerAssetFilledAmount?: BigNumber;
  makerAssetFilledAmount_not?: BigNumber;
  makerAssetFilledAmount_gt?: BigNumber;
  makerAssetFilledAmount_lt?: BigNumber;
  makerAssetFilledAmount_gte?: BigNumber;
  makerAssetFilledAmount_lte?: BigNumber;
  makerAssetFilledAmount_in?: BigNumber[];
  makerAssetFilledAmount_not_in?: BigNumber[];
  takerAssetFilledAmount?: BigNumber;
  takerAssetFilledAmount_not?: BigNumber;
  takerAssetFilledAmount_gt?: BigNumber;
  takerAssetFilledAmount_lt?: BigNumber;
  takerAssetFilledAmount_gte?: BigNumber;
  takerAssetFilledAmount_lte?: BigNumber;
  takerAssetFilledAmount_in?: BigNumber[];
  takerAssetFilledAmount_not_in?: BigNumber[];
  makerAssetDataV2?: string;
  makerAssetDataV2_not?: string;
  makerAssetDataV2_in?: string[];
  makerAssetDataV2_not_in?: string[];
  makerAssetDataV2_contains?: string;
  makerAssetDataV2_not_contains?: string;
  takerAssetDataV2?: string;
  takerAssetDataV2_not?: string;
  takerAssetDataV2_in?: string[];
  takerAssetDataV2_not_in?: string[];
  takerAssetDataV2_contains?: string;
  takerAssetDataV2_not_contains?: string;
  senderV2?: string;
  senderV2_not?: string;
  senderV2_in?: string[];
  senderV2_not_in?: string[];
  senderV2_contains?: string;
  senderV2_not_contains?: string;
}

export interface EventClient {
  getFillEventsAsync(
    numEntries: number,
    requestOpts?: FillEventFilter,
    numSkip?: number
  ): Promise<FillEvents>;
  getCancelEventsAsync(
    numEntries: number,
    requestOpts?: CancelEventFilter,
    numSkip?: number
  ): Promise<CancelEvents>;
  getEventsByUsersAsync(numEntries: number, numSkip: number): Promise<any>;
}
