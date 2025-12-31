import * as React from 'react';

import { classes } from 'utils/classes';
import { subscribeToCollection } from 'services/database/subscribeToCollection';
import { MainLayout } from 'layouts/mainLayout/mainLayout';
import { useAppStore } from 'stores/useAppStore/useAppStore';
import { Divider } from 'components/divider/divider';

import { ListItemData, Props } from './types';
import { ListItem } from './components/listItem/listItem';
import styles from './styles.module.scss';

export const List = <T,>(props: Props<T>) => {
  const { items, layout, aspectRatio, inputs, collection, mainPropertyKey, defaultData } = props;

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

  const handleLayoutClick = () => {
    useAppStore.setState({
      [`${collection}Layout`]: `${collection}Layout` === 'compact' ? 'full' : 'compact',
    });
  };

  return (
    <MainLayout
      buttons={[
        {
          type: 'secondary',
          icon: layout === 'compact' ? 'dashboard' : 'list',
          onClick: handleLayoutClick,
          hidden: layout === undefined,
        },
      ]}
      className={classes(
        styles.container,
        layout === 'full' && styles.containerFull,
        layout === 'compact' && styles.containerCompact
      )}
    >
      <ListItem<T>
        size="compact"
        collection={collection}
        defaultData={defaultData}
        mainPropertyKey={mainPropertyKey}
        inputs={[{ inputType: 'text', propertyKey: mainPropertyKey }]}
      />

      <Divider layer={1} />

      {renderItems()
        .sort((a, b) => Number(a.date) - Number(b.date))
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => Number(a.checked) - Number(b.checked))
        .map((item) => (
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
    </MainLayout>
  );
};
