import Header from './Header';
import Task from './Task';
import Team from './Team';
import Deck from './Deck';
import Refresh from '../App/Refresh';

import { useSelector } from 'react-redux';

function Game() {
  const { refreshing } = useSelector(state => state.game);

  return (
    <>
      {refreshing ? <Refresh /> : false}
      <Header />
      <Task />
      <Team />
      <Deck />
    </>
  );
}

export default Game;
