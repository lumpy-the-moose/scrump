import { ReactComponent as Logo } from '../logo.svg';
import Button from '../Common/Button';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import { setNickname, setGameId, setDeckType } from '../App/authSlice';

function Header(props) {
  const navigate = useNavigate();
  let [, setCookie, removeCookie] = useCookies();

  const dispatch = useDispatch();

  const Create = () => {
    removeCookie('gameId', { path: '/' });
    setCookie('deckType', 'mod', { path: '/' });

    dispatch(setGameId(''));
    dispatch(setDeckType('mod'));

    navigate('/create');
  };

  const Home = () => {
    removeCookie('user', { path: '/' });
    dispatch(setNickname(''));
    navigate('/');
  };

  return (
    <div className="header">
      <div className="logo">
        <Logo />
        |ScrumP| <br /> |Planning Poker|
      </div>
      <div className="header__manage">
        <Button className="header__button" text="New Game" onClick={Create} />
        <Button className="header__button" text="Log Out" onClick={Home} />
      </div>
    </div>
  );
}

export default Header;
