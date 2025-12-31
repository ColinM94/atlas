import * as React from 'react';
import { CSSProperties } from 'react';

import { ListItemData } from 'components/list/types';
import { InputText } from 'components/inputText/inputText';
import { classes } from 'utils/classes';
import { Collection, DatabaseRecord } from 'types/general';
import { mergeReducer } from 'utils/mergeReducer';

import { updateRecord } from 'services/database/updateRecord';
import { createRecord } from 'services/database/createRecord';
import { ListEditorProps } from '../listEditor/types';
import { ListEditor } from '../listEditor/listEditor';
import styles from './styles.module.scss';

interface Props<T> {
  size: 'compact' | 'full';
  item?: ListItemData<T>;
  collection: Collection;
  inputs: ListEditorProps<T>['inputs'];
  mainPropertyKey: keyof T;
  defaultData: () => T & DatabaseRecord;
  style?: CSSProperties;
  className?: string;
}

export const ListItem = <T,>(props: Props<T>) => {
  const { item, size, collection, inputs, defaultData, mainPropertyKey, style, className } = props;

  const [showEditor, setShowEditor] = React.useState(false);
  const [state, updateState] = React.useReducer(
    mergeReducer<T & DatabaseRecord>,
    item?.data || defaultData()
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setShowEditor(true);
  };

  const handleUpdate = async () => {
    if (state.id) {
      await updateRecord<Omit<T, 'id'>>({
        id: state.id,
        collection,
        data: state,
      });
    } else {
      await createRecord<Omit<T, 'id'>>({
        collection,
        data: state,
      });
    }

    updateState(defaultData());
    setShowEditor(false);
  };

  if (!item) {
    return (
      <InputText
        ref={inputRef}
        value={String(state[mainPropertyKey])}
        setValue={(value) => updateState({ [mainPropertyKey]: String(value) })}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleUpdate();
          }
        }}
        layer={1}
        className={classes(styles.name)}
      />
    );
  }

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
          state={state}
          updateState={updateState}
          collection={collection}
          show={showEditor}
          setShow={setShowEditor}
          inputs={inputs}
          onUpdate={handleUpdate}
        />
      </div>
    </>
  );
};
