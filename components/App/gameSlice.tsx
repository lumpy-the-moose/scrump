import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface gameState {
  refreshing: boolean;
  gameStage: 'waiting' | 'voting' | 'results';
  taskMessage: string;
  selectedCard: string;
  activeUsers: {}[];
  currentSet: string[];
}

const initialState: gameState = {
  refreshing: true,
  gameStage: 'waiting',
  taskMessage: '',
  selectedCard: '',
  activeUsers: [],
  currentSet: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    toVoting: state => {
      state.gameStage = 'voting';
    },

    toResults: state => {
      state.gameStage = 'results';
    },

    toWaiting: state => {
      state.gameStage = 'waiting';
      state.taskMessage = '';
      state.selectedCard = '';
    },

    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.refreshing = action.payload;
    },

    setTaskMessage: (state, action: PayloadAction<string>) => {
      state.taskMessage = action.payload;
    },

    setSelectedCard: (state, action: PayloadAction<string>) => {
      state.selectedCard = action.payload;
    },

    updateActiveUsers: (state, action: PayloadAction<{}[]>) => {
      state.activeUsers = [...action.payload];
    },

    updateCurrentSet: (state, action: PayloadAction<string[]>) => {
      state.currentSet = [...action.payload];
    },
  },
});

export const {
  toVoting,
  toResults,
  toWaiting,
  setRefreshing,
  setTaskMessage,
  setSelectedCard,
  updateActiveUsers,
  updateCurrentSet,
} = gameSlice.actions;

export default gameSlice.reducer;
