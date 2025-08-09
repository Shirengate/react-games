import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Game } from "../../../shared/types/responses";
const gamesSlice = createSlice({
  name: "games",
  initialState: {
    games: [] as Array<Game>,
  },
  reducers: {
    addGames(state, action) {},
  },
});

export const { addGames } = gamesSlice.actions;

export default gamesSlice.reducer;
