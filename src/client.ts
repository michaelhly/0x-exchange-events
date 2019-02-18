import {
  ApolloClient,
  gql,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "apollo-boost";
import "cross-fetch/polyfill";

import { MAX_PER_PAGE } from "./constants";
import { paginate } from "./paginate";
import {
  CancelEventFilter,
  CancelEvents,
  Client,
  FillEventFilter,
  FillEvents
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
   * Retrieve exchange fill events from the 0x subgraph
   * @param  numEntries number of query entries.
   * @param  requestOpts options specifying event queries to retrieve.
   */
  public async getFillEventsAsync(
    numEntries: number,
    requestOpts?: FillEventFilter
    // cursor?: string
  ): Promise<FillEvents> {
    const result: FillEvents = await this._client.query({
      variables: {
        first: numEntries > MAX_PER_PAGE ? MAX_PER_PAGE : numEntries,
        // after: cursor,
        where: requestOpts
      },
      query: gql`
        query filledOrders(
          $first: Int!
          $after: ID
          $where: FilledOrder_filter
        ) {
          fillEvents: filledOrders(
            first: $first
            after: $after
            where: $where
          ) {
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
    result.pageInfo = paginate(result.data.fillEvents);
    return result;
  }

  /**
   * Retrieve exchange cancel events from the 0x subgraph
   * @param  numEntries number of query entries.
   * @param  requestOpts options specifying event queries to retrieve.
   */
  public async getCancelEventsAsync(
    numEntries: number,
    requestOpts?: CancelEventFilter
    // cursor?: string
  ): Promise<CancelEvents> {
    const result: CancelEvents = await this._client.query({
      variables: {
        first: numEntries > MAX_PER_PAGE ? MAX_PER_PAGE : numEntries,
        // after: cursor,
        where: requestOpts
      },
      query: gql`
        query cancelledOrders(
          $first: Int!
          $after: ID
          $where: CancelledOrder_filter
        ) {
          cancelEvents: cancelledOrders(
            first: $first
            after: $after
            where: $where
          ) {
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
    result.pageInfo = paginate(result.data.cancelEvents);
    return result;
  }

  /**
   * Retrieve user events from the 0x subgraph
   * @param numEntries number of query entries.
   */
  public async getEventsByUsersAsync(numEntries: number): Promise<any> {
    const result = await this._client.query({
      variables: {
        first: numEntries > MAX_PER_PAGE ? MAX_PER_PAGE : numEntries
      },
      query: gql`
        query users($first: Int!) {
          users(first: $first) {
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
