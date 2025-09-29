import { pb } from "inits/backend";
import { Collection, DatabaseRecord } from "types/general";
import { listRecords } from "./listRecords";

type Item<T> = T & DatabaseRecord;

interface Params<T> {
  collection: Collection;
  onData: (data: Item<T>[]) => void;
  filter?: string;
}

export const subscribeToCollection = async <T>(params: Params<T>) => {
  const { onData, collection, filter } = params;

  let data: Item<T>[] = [];

  const response = await listRecords<Item<T>>({
    collection,
    filter: filter || "",
  });

  if (response.success) {
    data = response.data;
    onData(data);
  }

  const unsubscribe = await pb
    .collection(collection)
    .subscribe<Item<T>>("*", (e) => {
      if (e.action === "create" || e.action === "update") {
        data = [
          ...data.filter((record) => record.id !== e.record.id),
          e.record,
        ];

        onData(data);
      }

      if (e.action === "delete") {
        data = data.filter((record) => record.id !== e.record.id);
        onData(data);
      }
    });

  return unsubscribe;
};
