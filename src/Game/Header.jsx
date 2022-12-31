import { ReactComponent as Logo } from '../logo.svg';

import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { setNickname, setGameName } from '../App/authSlice';

function Header() {
  let [cookies] = useCookies();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAdmin } = useSelector(state => state.auth);

  const Create = () => {
    closeSession();
    dispatch(setGameName(''));
    navigate('/create');
  };

  const Home = () => {
    if (isAdmin) closeSession();
    dispatch(setNickname(''));
    dispatch(setGameName(''));
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
