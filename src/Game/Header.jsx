import { ReactComponent as Logo } from '../logo.svg';

import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const Create = () => {
    navigate('/create');
  };

  const Home = () => {
    navigate('/');
  };

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
