import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Game } from "../../../shared/types/responses";
const gamesSlice = createSlice({
  name: "games",
  initialState: {
    games: [] as Array<Game>,
    totalCount: 0 as number,
  },
  reducers: {
    addGames(state, action: PayloadAction<Array<Game>>) {
      state.games.push(...action.payload);
    },
    setTotalGames(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
  },
});

export const { addGames, setTotalGames } = gamesSlice.actions;

export default gamesSlice.reducer;
