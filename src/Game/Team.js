function Task(props) {
  return (
    <>
      <h2 className="team__title">Team</h2>
      <div className="team">
        <div className="team__user">
          {props.nickname} <span className="team__answer">{props.card}</span>
        </div>
      </div>
    </>
  );
}

export default Task;
