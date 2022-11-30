import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { nickname: '', gameId: '', deckType: 'FIBO', pokerSession: '', setsData: {} },
  reducers: {
    setNickname: (state, setState) => {
      state.nickname = setState;
    },

    setGameId: (state, setState) => {
      state.gameId = setState;
    },

    setPokerSession: (state, setState) => {
      state.pokerSession = setState;
    },

    setDeckType: (state, setState) => {
      state.deckType = setState;
    },

    updateSetsData: (state, data) => {
      state.setsData = { ...state.setsData, ...data.payload };
    },
  },
});

export const { setNickname, setGameId, setPokerSession, setDeckType, updateSetsData } =
  authSlice.actions;

export default authSlice.reducer;
