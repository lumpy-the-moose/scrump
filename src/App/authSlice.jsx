import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    nickname: '',
    gameId: '',
    deckType: 'FIBO',
    pokerSession: '',
    setsData: {},
    isAdmin: false,
  },
  reducers: {
    setNickname: (state, setState) => {
      state.nickname = setState.payload;
    },

    setGameId: (state, setState) => {
      state.gameId = setState.payload;
    },

    setPokerSession: (state, setState) => {
      state.pokerSession = setState.payload;
    },

    setDeckType: (state, setState) => {
      state.deckType = setState.payload;
    },

    updateSetsData: (state, data) => {
      state.setsData = { ...data.payload };
    },

    setIsAdmin: (state, data) => {
      state.isAdmin = data.payload;
    },
  },
});

export const {
  setNickname,
  setGameId,
  setPokerSession,
  setDeckType,
  updateSetsData,
  setIsAdmin,
} = authSlice.actions;

export default authSlice.reducer;
