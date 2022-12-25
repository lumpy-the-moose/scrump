import DeckType from './DeckType';
import { ReactComponent as Logo } from '../logo.svg';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setGameName } from '../App/authSlice';

function Create() {
  const navigate = useNavigate();
  let [cookies, setCookie] = useCookies();

  const dispatch = useDispatch();
  const { gameName, deckType } = useSelector(state => state.auth);

  const newGame = () => {
    axios('https://scrum-poker.space/scrum/poker/sessions', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Authorization: cookies.Authorization,
      },
      data: {
        name: gameName,
        estimateSetName: deckType,
      },
    }).then(r => {
      setCookie('PokerSession', r.data.data.id, { path: '/' });
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
          if (gameName) {
            newGame();
          }
        }}
      >
        <input
          type="text"
          placeholder="Game#"
          className="create__field"
          onChange={e => {
            dispatch(setGameName(e.target.value));
          }}
          autoFocus
        />
        <button
          type="button"
          className="create__button"
          onClick={newGame}
          disabled={!gameName}
        >
          Enter
        </button>
        <DeckType />
      </form>
    </>
  );
}

export default Create;
