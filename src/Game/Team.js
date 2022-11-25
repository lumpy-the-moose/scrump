import { useSelector } from 'react-redux';

function Team(props) {
  const nickname = useSelector(state => state.auth.nickname.payload);

  return (
    <>
      <h2 className="team__title">Team</h2>
      <div className="team">
        <div className="team__user">
          {nickname}
          <span className="team__answer" style={{ backgroundColor: props.card ? '#66dbb1' : '' }}>
            {props.card}
          </span>
        </div>
      </div>
    </>
  );
}

export default Team;
