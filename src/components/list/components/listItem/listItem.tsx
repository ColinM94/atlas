import * as React from 'react';
import { CSSProperties } from 'react';

import { ListItemData } from 'components/list/types';
import { InputText } from 'components/inputText/inputText';
import { classes } from 'utils/classes';
import { Collection, DatabaseRecord } from 'types/general';
import { mergeReducer } from 'utils/mergeReducer';
import { Button } from 'components/button/button';
import { updateRecord } from 'services/database/updateRecord';
import { createRecord } from 'services/database/createRecord';
import { formatDate } from 'utils/formatDate';

import { ListEditorProps } from '../listEditor/types';
import { ListEditor } from '../listEditor/listEditor';
import styles from './styles.module.scss';

interface Props<T> {
  size: 'compact' | 'full';
  item?: ListItemData<T & DatabaseRecord>;
  collection: Collection;
  inputs: ListEditorProps<T & DatabaseRecord>['inputs'];
  mainPropertyKey: keyof (T & DatabaseRecord);
  defaultData: () => T & DatabaseRecord;
  style?: CSSProperties;
  className?: string;
}

export const ListItem = <T,>(props: Props<T & DatabaseRecord>) => {
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

  if (!item && size == 'compact') return undefined;

  if (!item) {
    return (
      <InputText
        ref={inputRef}
        value={String(state[mainPropertyKey])}
        setValue={(value) =>
          updateState({
            [mainPropertyKey]: value,
          } as Partial<T & DatabaseRecord>)
        }
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            void handleUpdate();
          }
        }}
        layer={1}
        actionIcon="add"
        onActionClick={handleUpdate}
        inputClassName={styles.input}
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
        {Boolean(item.date) && <div className={styles.date}>{item.date}</div>}
      </div>
    );
  }

  return (
    <>
      <div
        onClick={handleEdit}
        className={classes(
          styles.containerFull,
          item.checked && styles.containerChecked,
          className
        )}
      >
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

            {item.date ? <div className={styles.date}>{formatDate(item.date)}</div> : ''}

            <Button
              icon={item.checked ? 'check_box' : 'check_box_outline_blank'}
              type="secondary"
              layer={1}
              onClick={(e) => {
                e.stopPropagation();

                console.log('hello');

                void updateRecord({
                  id: item.id,
                  collection,
                  data: {
                    checked: !item.checked,
                  },
                });
              }}
            />
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
