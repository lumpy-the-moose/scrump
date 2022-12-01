import { useSelector, useDispatch } from 'react-redux';

import { setSelectedCard } from '../App/gameSlice';

function Deck() {
  const dispatch = useDispatch();
  const { currentSet, deckDisabled, selectedCard } = useSelector(
    state => state.game
  );

  const deckMarkup = currentSet.map(item => (
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
  ));

  return (
    <>
      <h2 className="deck__title">Pick Your Card</h2>
      <form className="deck">{deckMarkup}</form>
    </>
  );
}

export default Deck;
