import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { FaLink } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import {
  toVoting,
  toResults,
  toWaiting,
  setRefreshing,
  setTaskMessage,
  setSelectedCard,
  updateActiveUsers,
} from '../App/gameSlice';

function Task() {
  let [cookies] = useCookies();

  const dispatch = useDispatch();
  const { gameName, isAdmin } = useSelector(state => state.auth);
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

  const changeSessionDescription = description => {
    axios('https://scrum-poker.space/scrum/poker/sessions/description', {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
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

  const estimate = async () => {
    return axios('https://scrum-poker.space/scrum/poker/sessions/estimate', {
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
    }).then(r => {
      console.log('estimate', r.data.data.users[0].estimate);
      dispatch(
        setSelectedCard(
          r.data.data.users.filter(user => user.nickname === cookies.nickname)[0]
            .estimate
        )
      );
      dispatch(updateActiveUsers(r.data.data.users));
    });
  };

  return (
    <>
      <div className="task__header">
        <h1 className="task__title">
          Game <span className="task__title--accent">{gameName}</span>
        </h1>
        <div
          id="taskLink"
          onClick={() => {
            navigator.clipboard.writeText(
              window.location.href.slice(0, -4) + cookies.PokerSession
            );
            console.log(window.location.href.slice(0, -4) + cookies.PokerSession);
          }}
        >
          <IconContext.Provider value={{ className: 'task__link' }}>
            <FaLink />
          </IconContext.Provider>
        </div>
        <Tooltip anchorId="taskLink" content="Copy Game Link" place="top" />
      </div>
      <div className="task">
        <textarea
          className="task__field"
          rows="5"
          placeholder="Describe your task"
          autoFocus
          disabled={!isAdmin || textareaDisabled}
          onInput={e => dispatch(setTaskMessage(e.target.value))}
          onFocus={() => dispatch(setRefreshing(false))}
          value={taskMessage}
        ></textarea>
        <div className="task__manage">
          <button
            type="button"
            className="task__button"
            disabled={!taskMessage}
            style={{ display: isAdmin ? 'block' : 'none' }}
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
                  estimate().then(() => {
                    toggleEstimationProgress();
                    dispatch(toResults());
                  });
                  break;
                case 'results':
                  changeSessionDescription(false);
                  dispatch(toWaiting());
                  dispatch(setRefreshing(true));
                  break;
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
