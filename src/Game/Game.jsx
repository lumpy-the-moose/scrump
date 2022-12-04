import Header from './Header';
import Task from './Task';
import Team from './Team';
import Deck from './Deck';
import Refresh from '../App/Refresh';

import React from 'react';
// import SockJsClient from 'react-stomp';

function Game() {
  Refresh();

  return (
    <>
      {/* <SockJsClient
        url="https://scrum-poker.space/scrum/poker/ws"
        topics={['/poker/' + pokerSession.id]}
        headers={{ Authorization: cookies.Authorization }}
        subscribeHeaders={{ Authorization: cookies.Authorization }}
        onMessage={msg => {
          console.log(msg);
        }}
      /> */}
      <Header />
      <Task />
      <Team />
      <Deck />
    </>
  );
}

export default Game;
