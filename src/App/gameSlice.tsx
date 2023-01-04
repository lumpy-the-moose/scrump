import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface gameState {
  refreshing: boolean;
  gameStage: string;
  textareaDisabled: boolean;
  taskMessage: string;
  stageButtonText: string;
  stageNotifyText: string;
  deckDisabled: boolean;
  selectedCard: string;
  answerVisible: boolean;
  activeUsers: {}[];
  currentSet: string[];
}

const initialState: gameState = {
  refreshing: true,
  gameStage: 'waiting',
  textareaDisabled: false,
  taskMessage: '',
  stageButtonText: 'Start',
  stageNotifyText: 'Waiting for task',
  deckDisabled: true,
  selectedCard: '',
  answerVisible: false,
  activeUsers: [],
  currentSet: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    toVoting: state => {
      state.gameStage = 'voting';
      state.textareaDisabled = true;
      state.stageButtonText = 'Stop';
      state.stageNotifyText = 'Voting';
      state.deckDisabled = false;
      state.answerVisible = false;
    },

    toResults: state => {
      state.gameStage = 'results';
      state.stageButtonText = 'New Task';
      state.stageNotifyText = 'Results';
      state.deckDisabled = true;
      state.answerVisible = true;
    },

    toWaiting: state => {
      state.gameStage = 'waiting';
      state.textareaDisabled = false;
      state.taskMessage = '';
      state.stageButtonText = 'Start';
      state.stageNotifyText = 'Waiting for task';
      state.selectedCard = '';
      state.answerVisible = false;
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
