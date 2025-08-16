import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Game } from "../../../shared/types/responses";

interface CollectPayload<T> {
  total: number;
  list: Array<T>;
}
const searchSlice = createSlice({
  name: "search",
  initialState: {
    collection: {
      games: {
        total: 0,
        list: [] as Array<Game>,
      },
    },
  },
  reducers: {
    updateGames(state, actions: PayloadAction<CollectPayload<Game>>) {
      state.collection.games.list = actions.payload.list;
      state.collection.games.total = actions.payload.total;
    },
  },
});
export const { updateGames } = searchSlice.actions;
export default searchSlice.reducer;
