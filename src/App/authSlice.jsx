import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    nickname: '',
    gameName: '',
    deckType: 'FIBO',
    setsData: {},
    isAdmin: false,
  },
  reducers: {
    setNickname: (state, setState) => {
      state.nickname = setState.payload;
    },

    setGameName: (state, setState) => {
      state.gameName = setState.payload;
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

export const { setNickname, setGameName, setDeckType, updateSetsData, setIsAdmin } =
  authSlice.actions;

export default authSlice.reducer;
