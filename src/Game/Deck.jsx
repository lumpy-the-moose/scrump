import { useSelector, useDispatch } from 'react-redux';

import { setSelectedCard } from '../App/gameSlice';

function Deck() {
  const dispatch = useDispatch();
  const setsData = useSelector(state => state.auth.setsData);
  const deckType = useSelector(state => state.auth.deckType);
  const deckDisabled = useSelector(state => state.game.deckDisabled);
  const selectedCard = useSelector(state => state.game.selectedCard);

  const deckMarkup = setsData[deckType].map(item => (
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
