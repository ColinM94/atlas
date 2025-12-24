import * as React from 'react';
import { CSSProperties } from 'react';

import { ListItemData } from 'components/list/types';
import { classes } from 'utils/classes';
import { Collection } from 'types/general';

import { ListEditorProps } from '../listEditor/types';
import { ListEditor } from '../listEditor/listEditor';
import styles from './styles.module.scss';

interface Props<T> {
  size: 'compact' | 'full';
  item: ListItemData<T>;
  collection: Collection;
  inputs: ListEditorProps<T>['inputs'];
  defaultData: () => T;
  style?: CSSProperties;
  className?: string;
}

export const ListItem = <T,>(props: Props<T>) => {
  const { item, size, collection, inputs, defaultData, style, className } = props;

  const [showEditor, setShowEditor] = React.useState(false);

  const handleEdit = () => {
    setShowEditor(true);
  };

  if (size === 'compact') {
    return (
      <div
        onClick={handleEdit}
        title={item.name}
        style={style}
        className={classes(styles.containerCompact, className)}
      >
        <div className={styles.imageContainer}>
          <img src={item.imageUrl} className={styles.image} />
        </div>

        {Boolean(item.rating) && <div className={styles.infoRating}>{item.rating} / 5</div>}
      </div>
    );
  }

  return (
    <>
      <div onClick={handleEdit} className={classes(styles.containerFull, className)}>
        {item.backgroundImageUrl && (
          <div
            style={{ backgroundImage: `url(${item.backgroundImageUrl})` }}
            className={styles.backgroundImage}
          />
        )}

        <div className={styles.containerContent}>
          {item.imageUrl && (
            <div className={styles.imageContainer}>
              <img src={item.imageUrl} className={styles.image} />
            </div>
          )}

          <div className={styles.content}>
            <div className={styles.info}>
              <div className={styles.infoTitle}>{item.name}</div>
              <div className={styles.infoSub}>{item.subtitle}</div>

              {Boolean(item.rating) && <div className={styles.infoRating}>{item.rating} / 5</div>}
            </div>
          </div>
        </div>

        <ListEditor
          collection={collection}
          data={item.data}
          id={item.id}
          defaultData={defaultData}
          show={showEditor}
          setShow={setShowEditor}
          inputs={inputs}
        />
      </div>
    </>
  );
};
