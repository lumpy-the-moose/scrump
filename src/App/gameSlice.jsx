import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    gameStage: 'waiting',
    textareaDisabled: false,
    taskMessage: '',
    stageButtonText: 'Start',
    stageNotifyClasses: 'task__notify',
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
      state.stageNotifyClasses = 'task__notify task__notify--teal';
      state.stageNotifyText = 'Voting';
      state.deckDisabled = false;
    },

    toResults: state => {
      state.gameStage = 'results';
      state.stageButtonText = 'New Task';
      state.stageNotifyClasses = 'task__notify task__notify--green';
      state.stageNotifyText = 'Results';
      state.deckDisabled = true;
      if (!state.selectedCard) state.selectedCard = '?';
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
  setTaskMessage,
  setSelectedCard,
  updateActiveUsers,
  updateCurrentSet,
} = gameSlice.actions;

export default gameSlice.reducer;
