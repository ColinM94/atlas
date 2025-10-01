import { pb } from "inits/backend";
import { RecordFullListOptions, SendOptions } from "pocketbase";
import { Collection, RequestResponse } from "types/general";
import { trackError } from "utils/trackError";

export interface ListRecordsParams {
  collection: Collection;
  filter?: RecordFullListOptions["filter"];
  requestKey?: SendOptions["requestKey"];
}

export const listRecords = async <T>(
  params: ListRecordsParams
): RequestResponse<T[]> => {
  try {
    const { collection, filter, requestKey } = params;

    const resultList = await pb.collection(collection).getFullList<T>({
      ...(filter && { filter }),
      ...(requestKey && { requestKey }),
    });

    return {
      data: resultList,
      success: true,
    };
  } catch (error) {
    trackError({
      error: error as Error,
      source: "listRecords",
      description: `Collection: ${params.collection}`,
    });
    return {
      success: false,
    };
  }
};
