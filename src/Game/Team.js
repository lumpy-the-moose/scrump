function Task(props) {
  console.log(props.card);

  return (
    <>
      <h2 className="team__title">Team</h2>
      <div className="team">
        <div className="team__user">
          {props.nickname}
          <span className="team__answer" style={{ backgroundColor: props.card ? '#66dbb1' : '' }}>
            {props.card}
          </span>
        </div>
      </div>
    </>
  );
}

export default Task;
