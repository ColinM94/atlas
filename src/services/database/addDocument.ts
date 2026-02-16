import { addDoc, collection } from 'firebase/firestore';
import { db } from 'inits/firebase';
import { Collection } from 'types/general';
import { trackError } from 'utils/trackError';

interface Params<T> {
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
  collection: Collection;
}

export const addDocument = async <T>(params: Params<T>) => {
  try {
    const { collection: collectionName, data } = params;

    const result = await addDoc(collection(db, collectionName), data);

    return {
      data: result,
      success: true,
    };
  } catch (error) {
    trackError({
      error: error as Error,
      source: 'addDocument',
    });

    return {
      success: false,
    };
  }
};
