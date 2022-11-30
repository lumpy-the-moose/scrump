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
    answer: '',
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
      state.selectedCard
        ? (state.answer = state.selectedCard)
        : (state.answer = setSelectedCard('?'));
    },

    toWaiting: state => {
      state.gameStage = 'waiting';
      state.textareaDisabled = false;
      state.taskMessage = setTaskMessage('');
      state.stageButtonText = 'Start';
      state.stageNotifyText = 'Waiting for task';
      state.answer = '';
      state.selectedCard = '';
    },

    setTaskMessage: (state, setState) => {
      state.taskMessage = setState;
    },

    setSelectedCard: (state, setState) => {
      state.selectedCard = setState;
    },
  },
});

export const { toVoting, toResults, toWaiting, setTaskMessage, setSelectedCard } =
  gameSlice.actions;

export default gameSlice.reducer;
