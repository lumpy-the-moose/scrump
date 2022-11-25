import Button from '../Common/Button';
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
  const gameId = useSelector(state => state.auth.gameId.payload);
  const deckType = useSelector(state => state.auth.deckType.payload);

  const toGame = () => {
    // let xhttp = new XMLHttpRequest();

    // xhttp.onreadystatechange = function () {
    //   if (this.readyState === 4 && this.status === 200) {
    //     const response = JSON.parse(this.responseText);
    //     if (response.status) {
    //       alert(response.message);
    //     } else {
    setCookie('gameId', gameId, { path: '/' });
    setCookie('deckType', deckType, { path: '/' });
    // dispatch(setPokerSession(response.data));
    navigate('/game');
    //     }
    //   }
    // };

    // xhttp.open('POST', 'https://scrum-poker.space/scrum/poker/sessions', true);
    // xhttp.setRequestHeader('Authorization', cookies['Authorization']);
    // xhttp.send();
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
          className="create__field"
          type="text"
          placeholder="Game#"
          onChange={e => dispatch(setGameId(e.target.value))}
          autoFocus
        />
        <Button className="create__button" text="Enter" onClick={toGame} disabled={!gameId} />
        <DeckType />
      </form>
    </>
  );
}

export default Create;
