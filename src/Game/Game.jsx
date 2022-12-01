import Header from './Header';
import Task from './Task';
import Team from './Team';
import Deck from './Deck';

import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

import { setGameId, setNickname } from '../App/authSlice';
import { updateCurrentSet } from '../App/gameSlice';

function Game() {
  let [cookies] = useCookies();

  const dispatch = useDispatch();
  const { pokerSession } = useSelector(state => state.auth);

  useEffect(() => {
    console.log(pokerSession);

    async function getGameData() {
      axios(`https://scrum-poker.space/scrum/poker/sessions/${pokerSession.id}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Authorization: cookies.Authorization,
        },
      }).then(r => {
        dispatch(setGameId(r.data.data.name));
        dispatch(setNickname(r.data.data.users[0].nickname));
        dispatch(updateCurrentSet(r.data.data.estimates));
      });
    }

    getGameData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <Task />
      <Team />
      <Deck />
    </>
  );
}

export default Game;
