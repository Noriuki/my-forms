import { createSlice } from "@reduxjs/toolkit";
import { IForm } from "../../types";
import { deleteForm, fetchFormList } from "../thunks/formListThunk";

interface IFormReducer {
  formList: IForm[];
  loading: boolean;
  error: string;
}

const initialState: IFormReducer = {
  formList: [],
  loading: false,
  error: "",
};

export const formListSlice = createSlice({
  name: "formList",
  initialState,

  reducers: {
    addForm(state, action) {
      state.formList.push(action.payload);
    },
    updateForm(state, action) {
      const { formId } = action.payload;
      const formIndex = state.formList.findIndex((f) => f.id === formId);
      state.formList[formIndex] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormList.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchFormList.fulfilled, (state, action) => {
        state.formList = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchFormList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(deleteForm.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteForm.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.formList = state.formList.filter((form) => form.id !== id);
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      });
  },
});

export const { addForm, updateForm } = formListSlice.actions;

export default formListSlice.reducer;
