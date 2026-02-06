import { Button } from 'components/button/button';
import { Modal } from 'components/modal/modal';
import { InputText } from 'components/inputText/inputText';
import { InputDate } from 'components/inputDate/inputDate';
import { deleteRecord } from 'services/database/deleteRecord';

import { ListEditorProps } from './types';
import styles from './styles.module.scss';
import { DatabaseRecord } from 'types/general';

export const ListEditor = <T,>(props: ListEditorProps<T & DatabaseRecord>) => {
  const { state, updateState, show, setShow, onUpdate, collection, inputs } = props;

  const handleDelete = async () => {
    if (!state.id) return;

    const response = await deleteRecord({
      collection,
      id: state.id,
    });

    if (!response.success) {
      alert('Failed to delete record');
    }
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
              value={String(state[input.propertyKey])}
              setValue={(value) =>
                updateState({ [input.propertyKey]: String(value) } as T & DatabaseRecord)
              }
              key={String(input.propertyKey)}
              layer={2}
            />
          );
        }

        if (input.inputType === 'date') {
          return (
            <InputDate
              value={state[input.propertyKey] as number}
              setValue={(value) =>
                updateState({ [input.propertyKey]: value } as T & DatabaseRecord)
              }
              key={String(input.propertyKey)}
              layer={2}
            />
          );
        }
      })}

      <div className={styles.buttons}>
        {state.id && (
          <Button
            label="Delete"
            onClick={() => void handleDelete()}
            type="secondary"
            layer={1}
            className={styles.deleteButton}
          />
        )}

        <Button
          label={state.id ? 'Update' : 'Add'}
          onClick={onUpdate}
          type="primary"
          className={styles.createButton}
        />
      </div>
    </Modal>
  );
};
