import { useSelector } from 'react-redux';

function Team() {
  const { activeUsers, answerVisible } = useSelector(state => state.game);

  const teamMarkup = activeUsers.map(({ nickname, estimate }) => (
    <div className="team__user" key="nickname">
      {nickname}
      <span className="team__answer">{answerVisible ? estimate : false}</span>
    </div>
  ));

  return (
    <>
      <h2 className="team__title">Team</h2>
      <div className="team">{teamMarkup}</div>
    </>
  );
}

export default Team;
