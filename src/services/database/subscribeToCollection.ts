import { pb } from "inits/backend";
import { DatabaseRecord } from "types/general";
import { listRecords, ListRecordsParams } from "./listRecords";
import type { UnsubscribeFunc } from "pocketbase";

type Item<T> = T & DatabaseRecord;

interface Params<T> extends ListRecordsParams {
  onData: (data: Item<T>[]) => void;
}

export const subscribeToCollection = <T>(params: Params<T>) => {
  const { onData, collection, filter, requestKey } = params;

  let disposed = false;
  let data: Item<T>[] = [];
  let innerUnsubscribe: UnsubscribeFunc | null = null;

  void listRecords<Item<T>>({ collection, filter, requestKey }).then((res) => {
    if (disposed || !res.success) return;

    data = res.data;
    onData(data);
  });

  void pb
    .collection(collection)
    .subscribe<Item<T>>("*", (e) => {
      if (disposed) return;

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
    })
    .then((unsubscribe) => {
      innerUnsubscribe = unsubscribe;
      if (disposed) void unsubscribe();
    });

  return () => {
    disposed = true;

    try {
      void innerUnsubscribe?.();
    } finally {
      if (requestKey) pb.cancelRequest(requestKey);
    }
  };
};
