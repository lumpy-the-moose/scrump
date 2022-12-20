import { ReactComponent as Logo } from '../logo.svg';

import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
  let [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  const Create = () => {
    navigate('/create');
    setCookie('gameId', '', { path: '/' });
    closeSession();
  };

  const Home = () => {
    navigate('/');
  };

  function closeSession() {
    axios('https://scrum-poker.space/scrum/poker/sessions', {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Authorization: cookies.Authorization,
      },
    });
  }

  return (
    <div className="header">
      <div className="logo">
        <Logo />
        |ScrumP| <br /> |Planning Poker|
      </div>
      <div className="header__manage">
        <button className="header__button" onClick={Create}>
          New Game
        </button>
        <button className="header__button" onClick={Home}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Header;
