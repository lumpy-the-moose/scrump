import Header from './Header';
import Task from './Task';
import Team from './Team';
import Deck from './Deck';
import { ReactComponent as Logo } from '../logo.svg';

import { useState } from 'react';

const deckData = [
  { zero: '0' },
  { half: '½' },
  { one: '1' },
  { two: '2' },
  { three: '3' },
  { four: '4' },
  { five: '5' },
  { eight: '8' },
  { thirteen: '13' },
  { sixteen: '16' },
  { twenty: '20' },
  { twentyOne: '21' },
  { thirtyTwo: '32' },
  { thirtyFour: '34' },
  { forty: '40' },
  { fiftyFive: '55' },
  { sixtyFour: '64' },
  { eightyNine: '89' },
  { hundred: '100' },
  { idk: '?' },
  { coffee: '☕' },
];

function Game(props) {
  let [card, setCard] = useState();
  let [result, setResult] = useState();
  let [deckState, setDeckState] = useState(true);

  function cardHandler(value) {
    setCard(value);
  }

  function toggleResult() {
    result ? setResult('') : card ? setResult(card) : setResult('?');
  }

  function toggleDeckState() {
    setDeckState(!deckState);
  }

  function uncheckCards() {
    const cards = document.getElementsByName('card');
    for (let i = 0; i < cards.length; i++) {
      cards[i].checked = false;
    }
    setCard('');
  }

  return (
    <>
      <div className="logo">
        <Logo />
        |ScrumP| <br /> |Planning Poker|
      </div>
      <Header
        gameId={props.gameId}
        nickname={props.nickname}
        setGameId={props.setGameId}
        setNickname={props.setNickname}
      />
      <Task
        toggleResult={toggleResult}
        toggleDeckState={toggleDeckState}
        uncheckCards={uncheckCards}
      />
      <Team nickname={props.nickname} card={result} />
      <Deck
        deckData={deckData}
        deckType={props.deckType}
        deckState={deckState}
        setCard={cardHandler}
      />
    </>
  );
}

export default Game;
