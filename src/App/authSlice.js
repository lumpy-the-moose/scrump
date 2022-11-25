import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { nickname: '', gameId: '', deckType: '', pokerSession: '' },
  reducers: {
    setNickname: (state, setState) => {
      state.nickname = setState;
    },
    setGameId: (state, setState) => {
      state.gameId = setState;
    },
    setDeckType: (state, setState) => {
      state.deckType = setState;
    },
    setPokerSession: (state, setState) => {
      state.pokerSession = setState;
    },
  },
});

export const { setNickname, setGameId, setDeckType, setPokerSession } = authSlice.actions;

export default authSlice.reducer;
