import { MainLayout } from 'layouts/mainLayout/mainLayout';
import { List } from 'components/list/list';
import { defaultShoppingItem } from 'constants/defaults';

import styles from './styles.module.scss';

export const ShoppingPage = () => {
  return (
    <MainLayout className={styles.container}>
      <List
        collection="shopping"
        defaultData={defaultShoppingItem}
        inputs={[
          {
            inputType: 'text',
            propertyKey: 'name',
          },
        ]}
        items={(dataItem) => ({
          id: dataItem.id,
          data: dataItem,
          name: dataItem.name,
        })}
        mainPropertyKey="name"
      />

      {/* {shoppingItems
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => Number(a.done) - Number(b.done))
        .map((item) => (
          <ShoppingItem shoppingItem={item} key={item.id} className={styles.item} />
        ))} */}

      {/* <ShoppingItem className={styles.item} /> */}
    </MainLayout>
  );
};
