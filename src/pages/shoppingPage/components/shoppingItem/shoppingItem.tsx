import * as React from 'react';

import { defaultShoppingItem } from 'constants/defaults';
import { InputText } from 'components/inputText/inputText';
import { Button } from 'components/button/button';
import { classes } from 'utils/classes';
import { mergeReducer } from 'utils/mergeReducer';
import { updateRecord } from 'services/database/updateRecord';
import { createRecord } from 'services/database/createRecord';
import { deleteRecord } from 'services/database/deleteRecord';
import { DatabaseRecord } from 'types/general';
import { ShoppingItemData } from 'types/shopping';

import styles from './styles.module.scss';

interface Props {
  shoppingItem?: ShoppingItemData;
  className?: string;
}

export const ShoppingItem = (props: Props) => {
  const { shoppingItem, className } = props;

  const [showEdit, setShowEdit] = React.useState(false);

  const [state, updateState] = React.useReducer(
    mergeReducer<Omit<ShoppingItemData, keyof DatabaseRecord>>,
    shoppingItem || defaultShoppingItem()
  );

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    updateState(state);
  }, [shoppingItem]);

  const handleUpdate = async () => {
    setShowEdit(false);

    if (shoppingItem) {
      await updateRecord({
        id: shoppingItem?.id,
        collection: 'shopping',
        data: state,
      });
    } else {
      await createRecord({
        collection: 'shopping',
        data: state,
      });

      updateState(defaultShoppingItem());
      inputRef.current?.focus();
    }

    setShowEdit(false);
  };

  const handleDone = () => {
    if (!shoppingItem) return;

    void updateRecord<ShoppingItemData>({
      collection: 'shopping',
      id: shoppingItem.id,
      data: {
        done: !state.done,
      },
    });
  };

  const handleDelete = () => {
    if (!shoppingItem) return;

    void deleteRecord({
      collection: 'shopping',
      id: shoppingItem.id,
    });
  };

  return (
    <div onClick={() => setShowEdit(true)} className={classes(styles.container, className)}>
      <div className={styles.row}>
        {showEdit && (
          <InputText
            ref={inputRef}
            value={state.name}
            setValue={(name) => updateState({ name })}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleUpdate();
              }
            }}
            className={classes(styles.name)}
          />
        )}

        {!showEdit && <div className={classes(styles.name)}>{state.name}</div>}

        {shoppingItem && !showEdit && (
          <Button
            type="secondary"
            icon={state.done ? 'check_box' : 'check_box_outline_blank'}
            layer={1}
            onClick={() => handleDone()}
            iconClassName={styles.buttonIcon}
            className={styles.checkButton}
          />
        )}

        {shoppingItem && (
          <Button
            type="secondary"
            icon="delete"
            layer={1}
            onClick={() => handleDelete()}
            iconClassName={styles.buttonIcon}
            className={styles.checkButton}
          />
        )}

        {shoppingItem && showEdit && (
          <Button type="secondary" icon="check" layer={1} onClick={handleUpdate} />
        )}

        {!shoppingItem && <Button type="secondary" icon="add" layer={1} onClick={handleUpdate} />}
      </div>
    </div>
  );
};
