import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quizSlice from "./slices/quizSlice";

const rootReducer = combineReducers({
  quiz: quizSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
export default rootReducer;
