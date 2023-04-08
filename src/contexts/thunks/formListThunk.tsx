import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchFormList = createAsyncThunk(
  "formList/fetchFormList",
  async () => {
    const response = await api.get(`/forms`);
    return response.data;
  }
);

export const deleteForm = createAsyncThunk(
  "formList/deleteForm",
  async (id: string) => {
    const response = await api.delete(`/forms/${id}`);
    return response.data;
  }
);
