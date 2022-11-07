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

  const toGame = () => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        if (response.status) {
          alert(response.message);
        } else {
          setCookie('gameId', props.gameId, { path: '/' });
          setCookie('deckType', props.deckType, { path: '/' });
          props.setPokerSession(response.data);
          navigate('/game');
        }
      }
    };

    xhttp.open('POST', 'http://185.25.116.234:8080/scrum/poker/sessions', true);
    xhttp.setRequestHeader('Authorization', cookies['Authorization']);
    xhttp.send();
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
            toGame();
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
        <Button className="home__button" text="Enter" onClick={toGame} disabled={!props.gameId} />
        <DeckType deckTypeData={deckTypeData} setDeckType={props.setDeckType} />
      </form>
    </div>
  );
}

export default Home;
