import { useParams, useSearchParams } from "react-router-dom";
import s from "./style.module.css";
import { useSelector } from "react-redux";
import { NoteForm } from "components/NoteForm/NoteForm";
export function Note(props) {
  const { noteId } = useParams();
  const [searchParam] = useSearchParams();
  const note = useSelector((store) =>
    store.NOTE.noteList.find((note) => note.id === noteId)
  );
  return <>{note && <NoteForm title={note.title} />}</>;
}
