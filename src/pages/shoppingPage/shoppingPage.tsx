import * as React from 'react';

import { subscribeToCollection } from 'services/database/subscribeToCollection';
import { MainLayout } from 'layouts/mainLayout/mainLayout';
import { ShoppingItemData } from 'types/shopping';

import { ShoppingItem } from './components/shoppingItem/shoppingItem';
import styles from './styles.module.scss';

export const ShoppingPage = () => {
  const [shoppingItems, setShoppingItems] = React.useState<ShoppingItemData[]>([]);

  React.useEffect(() => {
    const unsubscribe = subscribeToCollection<ShoppingItemData>({
      collection: 'shopping',
      onData: setShoppingItems,
    });

    return () => {
      unsubscribe?.();
    };
  }, []);

  return (
    <MainLayout className={styles.container}>
      {shoppingItems
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => Number(a.done) - Number(b.done))
        .map((item) => (
          <ShoppingItem shoppingItem={item} key={item.id} className={styles.item} />
        ))}

      <ShoppingItem className={styles.item} />
    </MainLayout>
  );
};
