import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import {
  toVoting,
  toResults,
  toWaiting,
  setTaskMessage,
  setSelectedCard,
  updateActiveUsers,
} from '../App/gameSlice';

function Task() {
  let [cookies] = useCookies();

  const dispatch = useDispatch();
  const { gameId, isAdmin } = useSelector(state => state.auth);
  const {
    gameStage,
    textareaDisabled,
    taskMessage,
    stageButtonText,
    stageNotifyClasses,
    stageNotifyText,
    selectedCard,
  } = useSelector(state => state.game);

  const toggleEstimationProgress = () => {
    axios('https://scrum-poker.space/scrum/poker/sessions/estimationToggle', {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Authorization: cookies.Authorization,
      },
    }).then(r => {
      console.log('estimatingInProgress', r.data.data.estimatingInProgress);
    });
  };

  const changeSessionDescription = () => {
    axios('https://scrum-poker.space/scrum/poker/sessions/description', {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Authorization: cookies.Authorization,
      },
      data: {
        description: taskMessage,
      },
    }).then(r => {
      console.log('taskDescription', r.data.data.taskDescription);
    });
  };

  const estimate = () => {
    axios('https://scrum-poker.space/scrum/poker/sessions/estimate', {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Authorization: cookies.Authorization,
      },
      data: {
        estimate: selectedCard ? selectedCard : '?',
      },
    })
      .then(r => {
        console.log('estimate', r.data.data.users[0].estimate);
        dispatch(setSelectedCard(r.data.data.users[0].estimate));
        dispatch(updateActiveUsers(r.data.data.users));
      })
      .then(r => {
        dispatch(toResults());
      });
  };

  return (
    <>
      <h1 className="task__title">
        Game <span className="task__title--accent">{gameId}</span>
      </h1>
      <div className="task">
        <textarea
          className="task__field"
          rows="5"
          placeholder="Describe your task"
          autoFocus
          disabled={!isAdmin || textareaDisabled}
          onInput={e => dispatch(setTaskMessage(e.target.value))}
          value={taskMessage}
        ></textarea>
        <div className="task__manage">
          <button
            type="button"
            className="task__button"
            disabled={!taskMessage}
            style={{ display: isAdmin ? 'block' : 'none' }}
            onClick={e => {
              // eslint-disable-next-line
              switch (gameStage) {
                case 'waiting':
                  toggleEstimationProgress();
                  changeSessionDescription();
                  dispatch(toVoting());
                  break;
                case 'voting':
                  estimate();
                  break;
                case 'results':
                  toggleEstimationProgress();
                  dispatch(toWaiting());
              }
            }}
          >
            {stageButtonText}
          </button>
          <div className={stageNotifyClasses}>{stageNotifyText}</div>
        </div>
      </div>
    </>
  );
}

export default Task;
