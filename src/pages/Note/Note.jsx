import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import s from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { NoteForm } from "components/NoteForm/NoteForm";
import { useState } from "react";
import { NoteApi } from "api/note-api";
import { deleteNote, updateNote } from "store/note/note-slice";

export function Note(props) {
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);
  const { noteId } = useParams();
  const [searchParam] = useSearchParams();
  const note = useSelector((store) =>
    store.NOTE.noteList.find((note) => note.id === noteId)
  );
  const navigate = useNavigate();
  async function submit(formValues) {
    const updatedNote = await NoteApi.uptade({
      ...formValues,
      id: note.id,
    });
    dispatch(updateNote(updatedNote));
    setIsEditable(false);
  }

  function deleteNote_(note) {
    if (window.confirm("Supprimer la note")) {
      NoteApi.deleteById(note.id);
      dispatch(deleteNote(note));
      navigate("/");
    }
  }

  return (
    <>
      {note && (
        <NoteForm
          isEditable={isEditable}
          title={isEditable ? "Edit note" : note.title}
          note={note}
          onClikEdit={() => setIsEditable(!isEditable)}
          onClickTrash={() => deleteNote_(note)}
          onSubmit={isEditable && submit}
        />
      )}
    </>
  );
}
