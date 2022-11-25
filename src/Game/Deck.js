import Radio from '../Common/Radio';

import { useSelector } from 'react-redux';

function Deck(props) {
  const deckType = useSelector(state => state.auth.deckType.payload);

  const modExceptions = [5, 9, 11, 12, 13, 15, 16, 17];
  const fiboExceptions = [1, 5, 9, 10, 12, 14, 16, 18];
  const powersExceptions = [1, 4, 6, 8, 10, 11, 13, 14, 15, 17, 18];

  let exceptions;

  switch (deckType) {
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

  const data = props.deckData.map((item, index) => {
    return !exceptions.includes(index) ? (
      <Radio
        name="card"
        inputClassName="deck__input"
        labelClassName="deck__label"
        key={Object.keys(item)[0]}
        value={Object.values(item)[0]}
        text={Object.values(item)[0]}
        onChange={e => {
          props.setCard(e.target.value);
        }}
        disabled={props.deckState}
      />
    ) : (
      false
    );
  });

  return (
    <>
      <h2 className="deck__title">Pick Your Card</h2>
      <div className="deck">{data}</div>
    </>
  );
}

export default Deck;
