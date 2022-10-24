import Button from '../Common/Button';
import DeckType from './DeckType';
import { ReactComponent as Logo } from '../logo.svg';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const deckTypeData = [
  {
    value: 'mod',
    btnText: '0 ½ 1 2 3 5 8 13 20 40 100 ? ☕',
  },
  {
    value: 'fibo',
    btnText: '0 1 2 3 5 8 13 21 34 55 89 ? ☕',
  },
  {
    value: 'powers',
    btnText: '0 1 2 4 8 16 32 64 ? ☕',
  },
];

function Home(props) {
  const navigate = useNavigate();

  let [cookies, setCookie] = useCookies();

  const toLogin = () => {
    setCookie('gameId', props.gameId, { path: '/' });
    setCookie('deckType', props.deckType, { path: '/' });
    navigate('/login');
  };

  return (
    <div className="home">
      <div className="logo">
        <Logo />
        |ScrumP| <br /> |Planning Poker|
      </div>
      <form
        className="home__form"
        onSubmit={e => {
          e.preventDefault();
          if (props.gameId) {
            toLogin();
          }
        }}
      >
        <input
          className="home__field"
          type="text"
          placeholder="Game#"
          onChange={e => props.setGameId(e.target.value)}
          autoFocus
        />
        <Button className="home__button" text="Enter" onClick={toLogin} disabled={!props.gameId} />
        <DeckType deckTypeData={deckTypeData} setDeckType={props.setDeckType} />
      </form>
    </div>
  );
}

export default Home;
