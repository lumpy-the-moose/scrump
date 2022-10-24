import Button from '../Common/Button';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Header(props) {
  const navigate = useNavigate();

  let [cookies, setCookie, removeCookie] = useCookies();

  const Home = () => {
    removeCookie('gameId', { path: '/' });
    setCookie('deckType', 'mod', { path: '/' });
    removeCookie('user', { path: '/' });

    props.setGameId('');
    props.setNickname('');
    navigate('/');
  };

  const toLogin = () => {
    removeCookie('user', { path: '/' });
    props.setNickname('');
    navigate('/login');
  };

  return (
    <div className="header">
      <h1 className="header__title">
        Game# <p className="header__title--accent">{props.gameId}</p>
      </h1>
      <div className="header__manage">
        <Button className="header__button" text="New Game" onClick={Home} />
        <Button className="header__button" text="Log Out" onClick={toLogin} />
      </div>
    </div>
  );
}

export default Header;
