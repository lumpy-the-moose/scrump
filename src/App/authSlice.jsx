import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { nickname: '', gameId: '', deckType: 'FIBO', pokerSession: '', deckData: null },
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
  },
});

export const { setNickname, setGameId, setPokerSession, setDeckType } = authSlice.actions;

export default authSlice.reducer;
