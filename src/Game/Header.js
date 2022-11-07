import Button from '../Common/Button';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Header(props) {
  const navigate = useNavigate();

  let [, setCookie, removeCookie] = useCookies();

  const Create = () => {
    removeCookie('gameId', { path: '/' });
    setCookie('deckType', 'mod', { path: '/' });
    removeCookie('user', { path: '/' });

    props.setGameId('');
    props.setDeckType('mod');
    props.setNickname('');
    navigate('/create');
  };

  const Home = () => {
    removeCookie('user', { path: '/' });
    props.setNickname('');
    navigate('/');
  };

  return (
    <div className="header">
      <h1 className="header__title">
        Game# <p className="header__title--accent">{props.gameId}</p>
      </h1>
      <div className="header__manage">
        <Button className="header__button" text="New Game" onClick={Create} />
        <Button className="header__button" text="Log Out" onClick={Home} />
      </div>
    </div>
  );
}

export default Header;
