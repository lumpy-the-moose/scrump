import { useSelector } from 'react-redux';

function Team() {
  const { nickname } = useSelector(state => state.auth);
  const { selectedCard, answerVisible } = useSelector(state => state.game);

  return (
    <>
      <h2 className="team__title">Team</h2>
      <div className="team">
        <div className="team__user">
          {nickname}
          <span className="team__answer">
            {answerVisible ? selectedCard : false}
          </span>
        </div>
      </div>
    </>
  );
}

export default Team;
