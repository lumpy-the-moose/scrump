import Button from '../Common/Button';

import React, { useState } from 'react';

function Task(props) {
  let [gameState, setGameState] = useState('waiting');
  let [textAreaState, setTextAreaState] = useState(false);
  let [textAreaValue, setTextAreaValue] = useState();
  let [stateButtonText, setStateButtonText] = useState('Start');
  let [stateMessage, setStateMessage] = useState('Waiting for task');
  let [taskStateClasses, setTaskStateClasses] = useState('task__state');

  let task = React.createRef();

  function changeGameState() {
    switch (gameState) {
      case 'waiting':
        setGameState('voting');
        setTextAreaState(true);
        setStateButtonText('Stop');
        setTaskStateClasses('task__state task__state--orange');
        setStateMessage('In progress');
        props.toggleDeckState();
        break;
      case 'voting':
        setGameState('results');
        setStateButtonText('New Task');
        setTaskStateClasses('task__state task__state--green');
        setStateMessage('Results');
        props.toggleResult();
        props.toggleDeckState();
        break;
      case 'results':
        setGameState('waiting');
        task.current.value = '';
        setTextAreaValue('');
        setTextAreaState(false);
        setStateButtonText('Start');
        setTaskStateClasses('task__state');
        setStateMessage('Waiting for task');
        props.toggleResult();
        props.uncheckCards();
        break;
      default:
        setGameState('Start');
        setTextAreaState(false);
        setStateMessage('Waiting for task');
    }
  }

  return (
    <>
      <h1 className="task__title">
        Game <span className="task__title--accent">{props.gameId}</span>
      </h1>
      <div className="task">
        <textarea
          className="task__field"
          ref={task}
          name="task"
          rows="5"
          placeholder="Describe your task"
          onChange={e => setTextAreaValue(e.target.value)}
          disabled={textAreaState}
          autoFocus
        ></textarea>
        <div>
          <Button
            className="task__button"
            text={stateButtonText}
            onClick={changeGameState}
            disabled={!textAreaValue}
          />
          <div className={taskStateClasses}>{stateMessage}</div>
        </div>
      </div>
    </>
  );
}

export default Task;
