import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';

import { toVoting, toResults, toWaiting, setTaskMessage } from '../App/gameSlice';

function Task() {
  let [cookies] = useCookies();

  const dispatch = useDispatch();
  const gameId = useSelector(state => state.auth.gameId);
  const gameStage = useSelector(state => state.game.gameStage);
  const textareaDisabled = useSelector(state => state.game.textareaDisabled);
  const taskMessage = useSelector(state => state.game.taskMessage);
  const stageButtonText = useSelector(state => state.game.stageButtonText);
  const stageNotifyClasses = useSelector(state => state.game.stageNotifyClasses);
  const stageNotifyText = useSelector(state => state.game.stageNotifyText);

  return (
    <>
      <h1 className="task__title">
        Game{' '}
        <span className="task__title--accent">
          {gameId ? gameId : cookies.gameId}
        </span>
      </h1>
      <div className="task">
        <textarea
          className="task__field"
          rows="5"
          placeholder="Describe your task"
          autoFocus
          disabled={textareaDisabled}
          onInput={e => dispatch(setTaskMessage(e.target.value))}
          value={taskMessage}
        ></textarea>
        <div className="task__manage">
          <button
            type="button"
            className="task__button"
            disabled={!taskMessage}
            onClick={e => {
              // eslint-disable-next-line
              switch (gameStage) {
                case 'waiting':
                  dispatch(toVoting());
                  break;
                case 'voting':
                  dispatch(toResults());
                  break;
                case 'results':
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
