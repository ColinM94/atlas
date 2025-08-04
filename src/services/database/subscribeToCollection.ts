import { pb } from "inits/backend";
import { Collection, DatabaseRecord } from "types/general";
import { listRecords } from "./listRecords";

type Item<T> = T & DatabaseRecord;

interface Params<T> {
  collection: Collection;
  setData: React.Dispatch<React.SetStateAction<Item<T>[]>>;
}

export const subscribeToCollection = async <T>(params: Params<T>) => {
  const { setData, collection } = params;

  const response = await listRecords<Item<T>>({
    collection,
  });

  if (response.success) {
    setData(response.data);
  }

  const unsubscribe = await pb
    .collection(collection)
      .subscribe<Item<T>>("*", (e) => {
        if (e.action === "create") {
          setData((prev) => [
            ...prev.filter((record) => record.id !== e.record.id),
            e.record,
          ]);
        }

        if (e.action === "delete") {
          setData((prev) => [
            ...prev.filter((record) => record.id !== e.record.id),
          ]);
        }

        if (e.action === "update") {
          setData((prev) => [
            ...prev.filter((record) => record.id !== e.record.id),
            e.record,
          ]);
        }
      });

  return unsubscribe;
};
