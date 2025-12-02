import * as React from "react";

import { InputText } from "components/inputText/inputText";
import { Modal } from "components/modal/modal";
import { Button } from "components/button/button";
import { createRecord } from "services/database/createRecord";
import { mergeReducer } from "utils/mergeReducer";
import { updateRecord } from "services/database/updateRecord";
import { deleteRecord } from "services/database/deleteRecord";
import { defaultPerson } from "constants/defaults";
import { Person } from "types/person";

import styles from "./styles.module.scss";

interface Props {
  person?: Person | undefined;
  show: boolean;
  setShow: (show: boolean) => void;
  onClose: () => void;
}

export const PersonEditor = (props: Props) => {
  const { person, show, setShow, onClose } = props;

  const [state, updateState] = React.useReducer(
    mergeReducer<Person>,
    person || defaultPerson()
  );

  React.useEffect(() => {
    updateState(person || defaultPerson());
  }, [show]);

  const handleDelete = async () => {
    if (!person) return;

    const response = await deleteRecord({
      collection: "people",
      id: person.id,
    });

    if (!response.success) {
      alert("Failed to delete record");
    }

    setShow(false);
  };

  const handleUpdate = async () => {
    if (person) {
      await updateRecord({
        id: person?.id,
        collection: "people",
        data: state,
      });
    } else {
      await createRecord({
        collection: "people",
        data: state,
      });
    }

    setShow(false);
  };

  return (
    <Modal
      show={show}
      setShow={setShow}
      label={person?.name || "New Person"}
      onClose={onClose}
      contentClassName={styles.content}
      className={styles.container}
    >
      <InputText
        value={state.name}
        setValue={(name) => updateState({ name })}
        label="Search"
        layer={1}
        className={styles.inputText}
      />

      <div className={styles.buttons}>
        {person && (
          <Button
            label="Delete"
            onClick={() => void handleDelete()}
            type="secondary"
            layer={1}
            className={styles.deleteButton}
          />
        )}

        <Button
          label={person ? "Update" : "Add"}
          onClick={handleUpdate}
          type="primary"
          className={styles.createButton}
        />
      </div>
    </Modal>
  );
};
