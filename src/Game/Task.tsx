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
  let [cookies] = useCookies();

  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector(state => state.auth);
  const {
    gameStage,
    textareaDisabled,
    taskMessage,
    stageButtonText,
    stageNotifyText,
  } = useAppSelector(state => state.game);

  const toggleEstimationProgress = () => {
    axios('https://scrum-poker.space/scrum/poker/sessions/estimationToggle', {
      method: 'PATCH',
      headers: {
        Authorization: cookies.Authorization,
      },
    }).then(r => {
      console.log('estimatingInProgress', r.data.data.estimatingInProgress);
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
    }).then(r => {
      console.log('taskDescription', r.data.data.taskDescription);
    });
  };

  return (
    <>
      <StyledTask>
        <TaskDescription
          rows={5}
          placeholder="Describe your task"
          autoFocus
          disabled={!isAdmin || textareaDisabled}
          onInput={e => {
            const target = e.target as HTMLInputElement;
            dispatch(setTaskMessage(target.value));
          }}
          onFocus={() => dispatch(setRefreshing(false))}
          value={taskMessage}
        ></TaskDescription>
        <TaskManage>
          <Button
            onClick={() => {
              // eslint-disable-next-line
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
            text={stageButtonText}
            display={isAdmin ? 'block' : 'none'}
            width={'180px'}
            height={'45px'}
            mobileWidth={'140px'}
          />
          <TaskNotify gameStage={gameStage}>{stageNotifyText}</TaskNotify>
        </TaskManage>
      </StyledTask>
    </>
  );
}
