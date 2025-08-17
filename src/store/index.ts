import { configureStore } from "@reduxjs/toolkit";
import { gamesReducer , searchReducer} from "./slices";

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    search:searchReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
