import Button from '../Common/Button';

import { useNavigate } from 'react-router-dom';

function Header(props) {
  const navigate = useNavigate();

  const Home = () => {
    props.setGameId('');
    props.setNickname('');
    navigate('/');
  };

  const toLogin = () => {
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
