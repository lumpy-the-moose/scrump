import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';

import { setSelectedCard } from '../App/gameSlice';

function Deck() {
  let [cookies] = useCookies();

  const dispatch = useDispatch();
  const deckType = useSelector(state => state.auth.deckType.payload);
  const deckDisabled = useSelector(state => state.game.deckDisabled);
  const selectedCard = useSelector(state => state.game.selectedCard.payload);

  const modExceptions = [5, 9, 11, 12, 13, 15, 16, 17];
  const fiboExceptions = [1, 5, 9, 10, 12, 14, 16, 18];
  const powersExceptions = [1, 4, 6, 8, 10, 11, 13, 14, 15, 17, 18];

  let exceptions;

  switch (deckType ? deckType : cookies.deckType) {
    case 'mod':
      exceptions = modExceptions;
      break;
    case 'fibo':
      exceptions = fiboExceptions;
      break;
    case 'powers':
      exceptions = powersExceptions;
      break;
    default:
      exceptions = modExceptions;
  }

  const deckData = {
    zero: '0',
    half: '½',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    eight: '8',
    thirteen: '13',
    sixteen: '16',
    twenty: '20',
    twentyOne: '21',
    thirtyTwo: '32',
    thirtyFour: '34',
    forty: '40',
    fiftyFive: '55',
    sixtyFour: '64',
    eightyNine: '89',
    hundred: '100',
    idk: '?',
    coffee: '☕',
  };

  const deckMarkup = Object.values(deckData).map((item, index) => {
    return !exceptions.includes(index) ? (
      <div key={item}>
        <input
          type="radio"
          name="card"
          id={item}
          value={item}
          className="deck__input"
          disabled={deckDisabled}
          checked={item === selectedCard}
          onChange={e => dispatch(setSelectedCard(e.target.value))}
        />
        <label htmlFor={item} className="deck__label">
          {item}
        </label>
      </div>
    ) : (
      false
    );
  });

  return (
    <>
      <h2 className="deck__title">Pick Your Card</h2>
      <form className="deck">{deckMarkup}</form>
    </>
  );
}

export default Deck;
