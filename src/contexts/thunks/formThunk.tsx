import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { IForm } from "../../types";

export const fetchForm = createAsyncThunk(
  "form/fetchForm",
  async (formId: string) => {
    const response = await api.get(`/forms/${formId}`);
    return response.data;
  }
);

export const saveForm = createAsyncThunk(
  "form/saveForm",
  async (form: IForm) => {
    api.post(`/forms`, form);
    return form;
  }
);
