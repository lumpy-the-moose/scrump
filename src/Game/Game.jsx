import Header from './Header';
import Task from './Task';
import Team from './Team';
import Deck from './Deck';
import Refresh from '../App/Refresh';

import React from 'react';

function Game() {
  return (
    <>
      <Refresh />
      <Header />
      <Task />
      <Team />
      <Deck />
    </>
  );
}

export default Game;
