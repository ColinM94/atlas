import { pb } from "inits/backend";
import { Collection, RequestResponse } from "types/general";
import { trackError } from "utils/trackError";

interface Params {
  collection: Collection;
  id: string;
}

export const deleteRecord = async (
  params: Params
): RequestResponse<undefined> => {
  try {
    const { collection, id } = params;

    const success = await pb.collection(collection).delete(id);

    if (!success)
      throw new Error(
        `Failed to delete record in collection: ${collection} with id ${id}`
      );

    return {
      data: undefined,
      success: true,
    };
  } catch (error) {
    trackError({
      error: error as Error,
      source: "deleteRecord",
    });
    return {
      success: false,
    };
  }
};
