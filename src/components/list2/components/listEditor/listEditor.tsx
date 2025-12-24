import * as React from 'react';

import { Button } from 'components/button/button';
import { Modal } from 'components/modal/modal';
import { mergeReducer } from 'utils/mergeReducer';
import { DatabaseRecord } from 'types/general';
import { deleteRecord } from 'services/database/deleteRecord';
import { updateRecord } from 'services/database/updateRecord';
import { createRecord } from 'services/database/createRecord';
import { InputText } from 'components/inputText/inputText';
import { InputDate } from 'components/inputDate/inputDate';

import styles from './styles.module.scss';
import { ListEditorProps } from './types';

export const ListEditor = <T,>(props: ListEditorProps<T>) => {
  const { show, setShow, collection, defaultData, data, inputs, id } = props;

  const [newData, updateNewData] = React.useReducer(
    mergeReducer<Omit<T, keyof DatabaseRecord>>,
    data || defaultData()
  );

  // React.useEffect(() => {
  //   updateNewTask(task || defaultTask());
  // }, [show]);

  const handleDelete = async () => {
    if (!id) return;

    const response = await deleteRecord({
      collection,
      id,
    });

    if (!response.success) {
      alert('Failed to delete record');
    }
  };

  const handleUpdate = async () => {
    if (id) {
      await updateRecord<Omit<T, 'id'>>({
        id,
        collection,
        data: newData,
      });
    } else {
      await createRecord<Omit<T, 'id'>>({
        collection: 'tasks',
        data: newData,
      });
    }

    setShow(false);
  };

  return (
    <Modal
      label="New Task"
      show={show}
      setShow={setShow}
      contentClassName={styles.content}
      className={styles.container}
    >
      {inputs?.map((input) => {
        if (input.inputType === 'text') {
          return (
            <InputText
              value={newData[input.propertyKey]}
              setValue={(value) => updateNewData({ [input.propertyKey]: value })}
              key={String(input.propertyKey)}
            />
          );
        }

        if (input.inputType === 'date') {
          return (
            <InputDate
              value={newData[input.propertyKey]}
              setValue={(value) => updateNewData({ [input.propertyKey]: value })}
              key={String(input.propertyKey)}
            />
          );
        }
      })}

      <div className={styles.buttons}>
        {id && (
          <Button
            label="Delete"
            onClick={() => void handleDelete()}
            type="secondary"
            layer={1}
            className={styles.deleteButton}
          />
        )}

        <Button
          label={id ? 'Update' : 'Add'}
          onClick={handleUpdate}
          type="primary"
          className={styles.createButton}
        />
      </div>
    </Modal>
  );
};
