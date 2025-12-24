import { classes } from 'utils/classes';

import { ListItemData, Props } from './types';
import { ListItem } from './components/listItem/listItem';
import styles from './styles.module.scss';

export const List = <T,>(props: Props<T>) => {
  const { data, items, layout = 'full', aspectRatio, inputs, collection, defaultData } = props;

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
          defaultItem={defaultData}
          style={{ aspectRatio }}
          inputs={inputs}
          className={classes(styles.item)}
        />
      ))}
    </div>
  );
};
