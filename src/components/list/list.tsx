import * as React from 'react';
import { classes } from 'utils/classes';
import { subscribeToCollection } from 'services/database/subscribeToCollection';

import { ListItemData, Props } from './types';
import { ListItem } from './components/listItem/listItem';
import styles from './styles.module.scss';

export const List = <T,>(props: Props<T>) => {
  const {
    items,
    layout = 'full',
    aspectRatio,
    inputs,
    collection,
    mainPropertyKey,
    defaultData,
  } = props;

  const [data, setData] = React.useState<T[]>([]);

  React.useEffect(() => {
    const unsubcribe = subscribeToCollection<T>({
      collection,
      onData: setData,
    });

    return () => {
      unsubcribe?.();
    };
  }, []);

  const renderItems = () => {
    return data.map((dataItem) => {
      const item: ListItemData<T> = { ...items(dataItem), data: dataItem };
      return item;
    });
  };

  return (
    <div
      className={classes(
        styles.container,
        layout === 'full' && styles.containerFull,
        layout === 'compact' && styles.containerCompact
      )}
    >
      {renderItems().map((item) => (
        <ListItem
          item={item}
          collection={collection}
          size={layout}
          key={item.id}
          style={{ aspectRatio }}
          inputs={inputs}
          defaultData={defaultData}
          mainPropertyKey={mainPropertyKey}
          className={classes(styles.item)}
        />
      ))}

      <ListItem<T>
        size="compact"
        collection={collection}
        defaultData={defaultData}
        mainPropertyKey={mainPropertyKey}
        inputs={[{ inputType: 'text', propertyKey: mainPropertyKey }]}
      />
    </div>
  );
};
