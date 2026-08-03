import * as React from 'react';

import { classes } from 'utils/classes';
import { getDocumentsSnapshot } from 'services/database/getDocumentsSnapshot';
import { MainLayout } from 'layouts/mainLayout/mainLayout';
import { DatabaseRecord } from 'types/general';

import { ListItemData, Props } from './types';
import { ListItem } from './components/listItem/listItem';
import styles from './styles.module.scss';

export const List = <T,>(props: Props<T & DatabaseRecord>) => {
  const { items, layout, aspectRatio, inputs, collection, mainPropertyKey, defaultData } = props;

  const [data, setData] = React.useState<(T & DatabaseRecord)[]>([]);

  React.useEffect(() => {
    const unsubscribe = getDocumentsSnapshot({
      collection,
      onData: setData,
    });

    return () => {
      unsubscribe?.();
    };
  }, [collection]);

  const renderItems = () => {
    return data.map((dataItem) => {
      const item: ListItemData<T & DatabaseRecord> = { ...items(dataItem), data: dataItem };
      return item;
    });
  };

  return (
    <MainLayout
      footer={
        <div className={styles.footer}>
          {/* <Divider layer={1} /> */}

          <ListItem<T & DatabaseRecord>
            size="full"
            collection={collection}
            defaultData={defaultData}
            mainPropertyKey={mainPropertyKey}
            inputs={[{ inputType: 'text', propertyKey: mainPropertyKey }]}
          />
        </div>
      }
      className={classes(
        styles.container,
        layout === 'full' && styles.containerFull,
        layout === 'compact' && styles.containerCompact
      )}
    >
      <div className={styles.items}>
        {renderItems()
          .sort((a, b) => Number(a.date) - Number(b.date))
          .sort((a, b) => a.name.localeCompare(b.name))
          .sort((a, b) => Number(a.checked) - Number(b.checked))
          .map((item) => (
            <ListItem
              item={item}
              collection={collection}
              size={layout || 'full'}
              key={item.id}
              style={{ aspectRatio }}
              inputs={inputs}
              defaultData={defaultData}
              mainPropertyKey={mainPropertyKey}
              className={classes(styles.item)}
            />
          ))}
      </div>

      {/* <Button type="primary" icon="add" className={styles.addButton} /> */}
    </MainLayout>
  );
};
