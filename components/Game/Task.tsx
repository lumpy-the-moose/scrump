import { useCookies } from 'react-cookie';
import { useAppSelector, useAppDispatch } from '../App/hooks';
import axios from 'axios';

import {
  toVoting,
  toResults,
  toWaiting,
  setRefreshing,
  setTaskMessage,
} from '../App/gameSlice';

import {
  StyledTask,
  TaskDescription,
  TaskManage,
  TaskNotify,
} from '../Styled/Task.styled';
import { Button } from '../Common/FormElements';

export default function Task() {
  const [cookies] = useCookies();

  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector(state => state.auth);
  const { gameStage, taskMessage } = useAppSelector(state => state.game);

  const toggleEstimationProgress = () => {
    axios('https://scrum-poker.space/scrum/poker/sessions/estimationToggle', {
      method: 'PATCH',
      headers: {
        Authorization: cookies.Authorization,
      },
    });
  };

  const changeSessionDescription = (description: string) => {
    axios('https://scrum-poker.space/scrum/poker/sessions/description', {
      method: 'PATCH',
      headers: {
        Authorization: cookies.Authorization,
      },
      data: {
        description,
      },
    });
  };

  return (
    <StyledTask>
      <TaskDescription
        rows={5}
        placeholder="Describe your task"
        disabled={!isAdmin || gameStage !== 'waiting'}
        onInput={e => {
          const target = e.target as HTMLInputElement;
          dispatch(setTaskMessage(target.value));
        }}
        onFocus={() => dispatch(setRefreshing(false))}
        value={taskMessage}
      ></TaskDescription>
      <TaskManage>
        <Button
          type="button"
          onClick={() => {
            switch (gameStage) {
              case 'waiting':
                toggleEstimationProgress();
                changeSessionDescription(taskMessage);
                dispatch(toVoting());
                dispatch(setRefreshing(true));
                break;
              case 'voting':
                toggleEstimationProgress();
                dispatch(toResults());
                break;
              case 'results':
                changeSessionDescription('false');
                dispatch(toWaiting());
                break;
            }
          }}
          disabled={!taskMessage}
          text={
            gameStage === 'waiting'
              ? 'Start'
              : gameStage === 'voting'
              ? 'Stop'
              : 'New Task'
          }
          display={isAdmin ? 'block' : 'none'}
          width={'180px'}
          height={'45px'}
          mobileWidth={'140px'}
        />
        <TaskNotify gameStage={gameStage}>
          {gameStage === 'waiting'
            ? 'Waiting for task'
            : gameStage === 'voting'
            ? 'Voting'
            : 'Results'}
        </TaskNotify>
      </TaskManage>
    </StyledTask>
  );
}
