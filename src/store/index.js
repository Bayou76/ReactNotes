import { configureStore } from "@reduxjs/toolkit";
import { notereducer } from "./note/note-slice";

export const store = configureStore({
  reducer: {
    NOTE: notereducer,
  },
});
