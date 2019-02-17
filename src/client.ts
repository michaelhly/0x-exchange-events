import {
  ApolloClient,
  gql,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "apollo-boost";
import "cross-fetch/polyfill";

import {
  CancelledOrderRequestOpts,
  Client,
  FilledOrderRequestOpts
} from "./types";

const TRAILING_SLASHES_REGEX = /\/+$/;

export class HttpSubgraphClient implements Client {
  private _client: ApolloClient<NormalizedCacheObject>;

  /**
   * Instantiates a new HttpSubgraphClient instance
   * @param   url    The HTTP url of the 0x subgraph you would like to interact with
   * @return  An instance of HttpSubgraphClient
   */
  constructor(url: string) {
    this._client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: url.replace(TRAILING_SLASHES_REGEX, "")
      })
    });
  }

  /**
   * Retrieve filled orders on exchange v2 from the 0x subgraph
   * @param numEntries number of query entries
   * @param requestOpts Options specifying order information to retrieve, page information, and network id.
   */
  public async getFilledOrdersV2Async(
    numEntries: number,
    requestOpts?: FilledOrderRequestOpts
  ): Promise<any> {
    const result = await this._client.query({
      variables: { numEntries, where: { ...requestOpts } },
      query: gql`
        query filledOrders($numEntries: Int!, $where: FilledOrder_filter) {
          filledOrders(first: $numEntries, where: $requestOpts) {
            id
            maker
            taker
            feeRecipient
            makerFeePaid
            takerFeePaid
            makerAssetFilledAmount
            takerAssetFilledAmount
            makerAssetDataV2
            takerAssetDataV2
            senderV2
          }
        }
      `
    });
    return result;
  }

  /**
   * Retrieve filled orders on exchange v1 from the 0x subgraph
   * @param numEntries number of query entries
   * @param requestOpts Options specifying order information to retrieve, page information, and network id.
   */
  public async getFilledOrdersV1Async(
    numEntries: number,
    requestOpts?: FilledOrderRequestOpts
  ): Promise<any> {
    const result = await this._client.query({
      variables: { numEntries, where: { ...requestOpts } },
      query: gql`
        query filledOrders($numEntries: Int!, $where: FilledOrder_filter) {
          filledOrders(first: $numEntries, where: $requestOpts) {
            id
            maker
            taker
            feeRecipient
            makerFeePaid
            takerFeePaid
            makerAssetFilledAmount
            takerAssetFilledAmount
            makerTokenAddrV1
            takerTokenAddrV1
            tokensV1
          }
        }
      `
    });
    return result;
  }

  /**
   * Retrieve cancelled orders on exchange v2 from the 0x subgraph
   * @param numEntries number of query entries
   * @param requestOpts Options specifying order information to retrieve, page information, and network id.
   */

  public async getCancelledOrdersV2Async(
    numEntries: number,
    requestOpts?: CancelledOrderRequestOpts
  ): Promise<any> {
    const result = await this._client.query({
      variables: { numEntries, where: { ...requestOpts } },
      query: gql`
        query cancelledOrders(
          $numEntries: Int!
          $where: CancelledOrder_filter
        ) {
          cancelledOrders(first: $numEntries, where: $requestOpts) {
            id
            maker
            feeRecipient
            makerAssetDataV2
            takerAssetDataV2
            senderV2
          }
        }
      `
    });
    return result;
  }

  /**
   * Retrieve cancelled orders on exchange v2 from the 0x subgraph
   * @param numEntries number of query entries
   * @param requestOpts Options specifying order information to retrieve, page information, and network id.
   */

  public async getCancelledOrdersV1Async(
    numEntries: number,
    requestOpts?: CancelledOrderRequestOpts
  ): Promise<any> {
    const result = await this._client.query({
      variables: { numEntries, where: { ...requestOpts } },
      query: gql`
        query cancelledOrders(
          $numEntries: Int!
          $where: CancelledOrder_filter
        ) {
          cancelledOrders(first: $numEntries, where: $requestOpts) {
            id
            maker
            feeRecipient
            makerTokenAddrV1
            takerTokenAddrV1
            makerTokenAmountV1
            takerTokenAmountV1
            tokensV1
          }
        }
      `
    });
    return result;
  }
}
