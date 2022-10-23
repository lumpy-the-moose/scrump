import Button from '../Common/Button';

import React, { useState } from 'react';

function Task(props) {
  let [gameState, setGameState] = useState('Start');
  let [textAreaState, setTextAreaState] = useState(false);
  let [textAreaValue, setTextAreaValue] = useState();
  let [stateMessage, setStateMessage] = useState('Waiting for task');
  let [taskStateClasses, setTaskStateClasses] = useState('task__state');

  let task = React.createRef();

  function changeGameState() {
    switch (gameState) {
      case 'Start':
        setGameState('Stop');
        setTextAreaState(true);
        setTaskStateClasses('task__state task__state--orange');
        setStateMessage('In progress');
        props.toggleDeckState();
        break;
      case 'Stop':
        setGameState('New Task');
        setTaskStateClasses('task__state task__state--green');
        setStateMessage('Results');
        props.toggleResult();
        props.toggleDeckState();
        break;
      case 'New Task':
        task.current.value = '';
        setTextAreaValue('');
        setGameState('Start');
        setTextAreaState(false);
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
      <Button
        className="task__button"
        text={gameState}
        onClick={changeGameState}
        disabled={!textAreaValue}
      />
      <div className={taskStateClasses}>{stateMessage}</div>
    </div>
  );
}

export default Task;
