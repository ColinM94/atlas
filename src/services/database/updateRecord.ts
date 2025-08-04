import { RecordModel } from "pocketbase";

import { pb } from "inits/backend";
import { Collection, RequestResponse } from "types/general";
import { trackError } from "utils/trackError";

interface Params<T> {
  id: string;
  data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>;
  collection: Collection;
}

export const updateRecord = async <T>(
  params: Params<T>
): RequestResponse<RecordModel> => {
  try {
    const { id, collection, data } = params;

    const record = await pb.collection(collection).update(id, data);

    return {
      data: record,
      success: true,
    };
  } catch (error) {
    trackError({
      error,
      source: "updateRecord",
    });

    return {
      success: false,
    };
  }
};
