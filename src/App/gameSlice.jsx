import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
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
  },
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
      state.answer = '';
      state.selectedCard = '';
      state.answerVisible = false;
    },

    setRefreshing: (state, setState) => {
      state.refreshing = setState.payload;
    },

    setTaskMessage: (state, setState) => {
      state.taskMessage = setState.payload;
    },

    setSelectedCard: (state, setState) => {
      state.selectedCard = setState.payload;
    },

    updateActiveUsers: (state, data) => {
      state.activeUsers = [...data.payload];
    },

    updateCurrentSet: (state, data) => {
      state.currentSet = [...data.payload];
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
