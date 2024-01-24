import { configureStore } from "@reduxjs/toolkit";
import screenReducer from './screenChanger/screenSlice'

export const store = configureStore({
  reducer: {screenReducer},
})