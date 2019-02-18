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
  constructor(
    url: string = "https://api.thegraph.com/subgraphs/name/michaelhly/zero_ex_events"
  ) {
    this._client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: url.replace(TRAILING_SLASHES_REGEX, "")
      })
    });
  }

  /**
   * Retrieve filled orders from the 0x subgraph
   * @param numEntries number of query entries.
   * @param requestOpts Options specifying order information to retrieve, page information, and network id.
   */
  public async getFilledOrdersAsync(
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
   * Retrieve cancelled orders on exchange from the 0x subgraph
   * @param numEntries number of query entries.
   * @param requestOpts Options specifying order information to retrieve, page information, and network id.
   */

  public async getCancelledOrdersAsync(
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
   * Retrieve user orders from the 0x subgraph
   * @param numEntries number of query entries.
   * @param userAddress address of the user to look for
   */
  public async getOrdersByUsersAsync(
    numEntries: number,
    userAddress: string
  ): Promise<any> {
    const result = await this._client.query({
      variables: { numEntries, where: { id: userAddress } },
      query: gql`
        query users($numEntries: Int!, $where: User_filter) {
          users(first: $numEntires, where: $userAddress) {
            id
            filledOrdersMaker {
              id
            }
            filledOrdersTaker {
              id
            }
            filledOrdersFeeRecipient {
              id
            }
          }
        }
      `
    });
    return result;
  }
}
