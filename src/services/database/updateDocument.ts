import { Collection } from 'types/general';
import { trackError } from 'utils/trackError';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'inits/firebase';

interface Params<T> {
  id: string;
  data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>;
  collection: Collection;
}

export const updateDocument = async <T>(params: Params<T>) => {
  const { id, collection: collectionName, data } = params;
  try {
    await updateDoc(doc(db, collectionName, id), data);

    return {
      data,
      success: true,
    };
  } catch (error) {
    trackError({
      error: error as Error,
      source: 'updateDocument',
      description: `Failed to update document ${id} in collection ${collectionName}`,
    });

    return {
      success: false,
    };
  }
};
