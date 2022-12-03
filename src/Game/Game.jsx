import Header from './Header';
import Task from './Task';
import Team from './Team';
import Deck from './Deck';

import React from 'react';
import SockJsClient from 'react-stomp';

import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

import { setPokerSession, setGameId, setNickname } from '../App/authSlice';
import { updateActiveUsers, updateCurrentSet } from '../App/gameSlice';

function Game() {
  let [cookies] = useCookies();

  const dispatch = useDispatch();
  const { pokerSession } = useSelector(state => state.auth);

  useEffect(() => {
    async function refreshGameData() {
      axios(`https://scrum-poker.space/scrum/poker/sessions/${pokerSession.id}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Authorization: cookies.Authorization,
        },
      }).then(r => {
        console.log(r.data.data);

        dispatch(setPokerSession(r.data.data));
        dispatch(setGameId(r.data.data.name));
        dispatch(updateActiveUsers(r.data.data.users));
        dispatch(updateCurrentSet(r.data.data.estimates));
      });
    }

    refreshGameData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <SockJsClient
        url="https://scrum-poker.space/scrum/poker/ws"
        topics={['/poker/' + pokerSession.id]}
        headers={{ Authorization: cookies.Authorization }}
        subscribeHeaders={{ Authorization: cookies.Authorization }}
        onMessage={msg => {
          console.log(msg);
        }}
      />
      <Header />
      <Task />
      <Team />
      <Deck />
    </>
  );
}

export default Game;
