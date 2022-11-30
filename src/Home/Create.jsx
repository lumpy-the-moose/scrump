import DeckType from './DeckType';
import { ReactComponent as Logo } from '../logo.svg';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';

import { setGameId, setPokerSession } from '../App/authSlice';

function Create() {
  const navigate = useNavigate();
  let [cookies, setCookie] = useCookies();

  const dispatch = useDispatch();
  const gameId = useSelector(state => state.auth.gameId);
  const deckType = useSelector(state => state.auth.deckType);

  const toGame = () => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        if (response.status) {
          alert(response.message);
        } else {
          dispatch(setPokerSession(response.data));
          navigate('/game');
        }
      }
    };

    xhttp.open('POST', 'https://scrum-poker.space/scrum/poker/sessions', true);
    xhttp.setRequestHeader('Authorization', cookies['Authorization']);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(
      JSON.stringify({
        name: gameId,
        estimateSetName: deckType,
      })
    );
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <Logo />
          |ScrumP| <br /> |Planning Poker|
        </div>
      </div>
      <form
        className="create__form"
        onSubmit={e => {
          e.preventDefault();
          if (gameId) {
            toGame();
          }
        }}
      >
        <input
          type="text"
          placeholder="Game#"
          className="create__field"
          onChange={e => {
            dispatch(setGameId(e.target.value));
            setCookie('gameId', e.target.value, { path: '/' });
          }}
          value={gameId ? gameId : cookies.gameId ? cookies.gameId : ''}
          autoFocus
        />
        <button
          type="button"
          className="create__button"
          onClick={toGame}
          disabled={!gameId && !cookies.gameId}
        >
          Enter
        </button>
        <DeckType />
      </form>
    </>
  );
}

export default Create;
