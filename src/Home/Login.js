import Button from '../Common/Button';
import { ReactComponent as Logo } from '../logo.svg';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Login(props) {
  const navigate = useNavigate();

  let [, setCookie] = useCookies();

  const toGame = () => {
    setCookie('user', props.nickname, { path: '/' });
    navigate('/game');
  };

  return (
    <div className="login">
      <div className="logo">
        <Logo />
        |ScrumP| <br /> |Planning Poker|
      </div>
      <form
        className="login__form"
        onSubmit={e => {
          e.preventDefault();
          if (props.nickname) {
            toGame();
          }
        }}
      >
        <input
          className="login__field"
          type="text"
          placeholder="Nickname"
          onChange={e => props.setNickname(e.target.value)}
          autoFocus
        />
        <Button className="login__button" text="Join" onClick={toGame} disabled={!props.nickname} />
      </form>
      <div className="login__loader"></div>
    </div>
  );
}

export default Login;
