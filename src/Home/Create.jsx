import DeckType from './DeckType';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setGameName } from '../App/authSlice';

import LogoElement from '../Common/LogoElement';
import { Form, Input, Button } from '../Common/FormElements';

export default function Create() {
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
      <LogoElement />
      <Form
        onSubmit={e => {
          e.preventDefault();
          if (gameName) {
            newGame();
          }
        }}
      >
        <Input
          placeholder="Game#"
          onChange={e => {
            dispatch(setGameName(e.target.value));
          }}
        />
        <Button
          onClick={newGame}
          disabled={!gameName}
          text={'Enter'}
          width={'150px'}
          height={'45px'}
        />
      </Form>
      <DeckType />
    </>
  );
}
