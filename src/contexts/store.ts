import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import formListReducer from "./reducers/formListSlice";
import formReducer from "./reducers/formSlice";

export const store = configureStore({
  reducer: {
    formList: formListReducer,
    form: formReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
