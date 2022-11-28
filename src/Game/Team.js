import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

function Team() {
  let [cookies] = useCookies();

  const nickname = useSelector(state => state.auth.nickname.payload);
  const answer = useSelector(state => state.game.answer.payload);

  return (
    <>
      <h2 className="team__title">Team</h2>
      <div className="team">
        <div className="team__user">
          {nickname ? nickname : cookies.nickname}
          <span className="team__answer">{answer}</span>
        </div>
      </div>
    </>
  );
}

export default Team;
