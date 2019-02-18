import { PageInfoObject } from "./types";

export const paginate = <T>(collection: T[]): PageInfoObject => {
  const paginatedCollection = {
    cursor: collection[collection.length - 1]["id"], // tslint:disable-line:no-string-literal
    perPage: collection.length
  };
  return paginatedCollection;
};
