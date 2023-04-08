import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { IForm } from "../../types";
import { fetchForm, saveForm } from "../thunks/formThunk";
import { deleteForm } from "../thunks/formListThunk";

/* reducer initial states */
interface IFormReducer {
  form: IForm;
  loading: boolean;
  error: string;
}

const initialState: IFormReducer = {
  form: {
    title: "Título",
    questions: [],
  },
  loading: false,
  error: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,

  reducers: {
    clearForm: (state, action) => {
      state.form = { title: "Título", questions: [] };
    },
    updateTitle: (state, action) => {
      const { title } = action.payload;
      state.form.title = title;
    },
    addQuestion: (state, action) => {
      const { type, text, options } = action.payload;
      const newQuestion = {
        id: uuidv4(),
        type,
        text,
        options,
      };
      state.form.questions.push(newQuestion);
    },
    updateQuestion: (state, action) => {
      const { questionId, updates } = action.payload;
      const questionIndex = state.form.questions.findIndex(
        (q) => q.id === questionId
      );
      if (questionIndex >= 0) {
        state.form.questions[questionIndex] = {
          ...state.form.questions[questionIndex],
          ...updates,
        };
      }
    },
    deleteQuestion: (state, action) => {
      const questionId = action.payload;
      state.form.questions = state.form.questions.filter(
        (q) => q.id !== questionId
      );
    },
    updateQuestionList: (state, action) => {
      const updatedList = action.payload;
      state.form.questions = updatedList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForm.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchForm.fulfilled, (state, action) => {
        console.log(action.payload);
        state.form = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(saveForm.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(saveForm.fulfilled, (state, action) => {
        state.form = { title: "Título", questions: [] };
        state.loading = false;
        state.error = "";
      })
      .addCase(saveForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      });
  },
});

export const {
  clearForm,
  updateTitle,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  updateQuestionList,
} = formSlice.actions;

export default formSlice.reducer;
