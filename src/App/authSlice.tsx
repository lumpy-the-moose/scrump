import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
  nickname: string;
  gameName: string;
  deckType: string;
  setsData: {};
  isAdmin: boolean;
}

const initialState: authState = {
  nickname: '',
  gameName: '',
  deckType: 'FIBO',
  setsData: {},
  isAdmin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },

    setGameName: (state, action: PayloadAction<string>) => {
      state.gameName = action.payload;
    },

    setDeckType: (state, action: PayloadAction<string>) => {
      state.deckType = action.payload;
    },

    updateSetsData: (state, action: PayloadAction<{}>) => {
      state.setsData = { ...action.payload };
    },

    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { setNickname, setGameName, setDeckType, updateSetsData, setIsAdmin } =
  authSlice.actions;

export default authSlice.reducer;
