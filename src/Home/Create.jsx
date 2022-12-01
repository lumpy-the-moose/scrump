import DeckType from './DeckType';
import { ReactComponent as Logo } from '../logo.svg';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setGameId, setPokerSession } from '../App/authSlice';

function Create() {
  const navigate = useNavigate();
  let [cookies, setCookie] = useCookies();

  const dispatch = useDispatch();
  const { gameId, deckType } = useSelector(state => state.auth);

  const toGame = () => {
    axios('https://scrum-poker.space/scrum/poker/sessions', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Authorization: cookies.Authorization,
      },
      data: {
        name: gameId,
        estimateSetName: deckType,
      },
    }).then(r => {
      dispatch(setPokerSession(r.data.data));
      navigate('/game');
    });
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
          value={gameId ? gameId : ''}
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
