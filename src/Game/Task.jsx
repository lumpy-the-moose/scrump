import { useSelector, useDispatch } from 'react-redux';

import { toVoting, toResults, toWaiting, setTaskMessage } from '../App/gameSlice';

function Task() {
  const dispatch = useDispatch();
  const { gameId } = useSelector(state => state.auth);
  const {
    gameStage,
    textareaDisabled,
    taskMessage,
    stageButtonText,
    stageNotifyClasses,
    stageNotifyText,
  } = useSelector(state => state.game);

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
