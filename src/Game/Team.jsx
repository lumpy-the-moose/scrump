import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

function Team() {
  let [cookies] = useCookies();

  const nickname = useSelector(state => state.auth.nickname);
  const selectedCard = useSelector(state => state.game.selectedCard);
  const answerVisible = useSelector(state => state.game.answerVisible);

  return (
    <>
      <h2 className="team__title">Team</h2>
      <div className="team">
        <div className="team__user">
          {nickname ? nickname : cookies.nickname}
          <span className="team__answer">
            {answerVisible ? selectedCard : false}
          </span>
        </div>
      </div>
    </>
  );
}

export default Team;
