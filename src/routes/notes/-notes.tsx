import * as React from "react";
import { UnsubscribeFunc } from "pocketbase";

import { Button } from "components/button/button";
import { NoteCard } from "components/noteCard/noteCard";
import { InputText } from "components/inputText/inputText";
import { Card } from "components/card/card";
import { createRecord } from "services/database/createRecord";
import { deleteRecord } from "services/database/deleteRecord";
import { subscribeToCollection } from "services/database/subscribeToCollection";
import { useAppStore } from "stores/appStore";
import { Note } from "types/notes";
import { FormSubmitEvent } from "types/general";
import { reactReducer } from "utils/reactReducer";

import styles from "./styles.module.css";

export const Notes = () => {
  const { user } = useAppStore();

  const [newNote, updateNewNote] = reactReducer<Note>({
    id: "",
    heading: "",
    text: "",
    userId: user.id,
  });

  const [notes, setNotes] = React.useState<Note[]>([]);

  React.useEffect(() => {
    let unsubscribe: UnsubscribeFunc | undefined;

    (async () => {
      unsubscribe = await subscribeToCollection({
        collection: "notes",
        setData: setNotes,
      });
    })();

    return () => {
      unsubscribe?.();
    };
  }, []);

  const handleDelete = async (noteId: string) => {
    await deleteRecord({
      collection: "notes",
      id: noteId,
    });
  };

  const handleSubmit = async (event?: FormSubmitEvent) => {
    event?.preventDefault();

    if (!newNote.heading || !newNote.text) return;

    await createRecord<Note>({
      collection: "notes",
      data: newNote,
    });
  };

  return (
    <>
      {notes.map((note) => (
        <NoteCard
          note={note}
          key={note.id}
          onDeleteClick={() => handleDelete(note.id)}
          className={styles.note}
        />
      ))}

      <Card className={styles.newNote}>
        <form onSubmit={handleSubmit} className={styles.newNoteForm}>
          <InputText
            label="Heading"
            value={newNote.heading}
            setValue={(heading) => updateNewNote({ heading })}
            surface={1}
          />

          <InputText
            label="Text"
            value={newNote.text}
            setValue={(text) => updateNewNote({ text })}
            surface={1}
          />

          <Button
            icon="add"
            label="Create"
            onClick={handleSubmit}
            surface={1}
          />
        </form>
      </Card>
    </>
  );
};
