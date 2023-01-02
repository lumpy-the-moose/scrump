import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setSelectedCard, updateActiveUsers } from '../App/gameSlice';

function Deck() {
  let [cookies] = useCookies();

  const dispatch = useDispatch();
  const { currentSet, deckDisabled, selectedCard } = useSelector(
    state => state.game
  );

  const estimate = async estimate => {
    const r = await axios(
      'https://scrum-poker.space/scrum/poker/sessions/estimate',
      {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Authorization: cookies.Authorization,
        },
        data: {
          estimate,
        },
      }
    );

    dispatch(updateActiveUsers(r.data.data.users));
  };

  const deckMarkup = currentSet.map(item => (
    <div key={item}>
      <input
        type="radio"
        name="card"
        id={item}
        value={item}
        className="deck__input"
        disabled={deckDisabled}
        onChange={e => {
          estimate(e.target.value);
          dispatch(setSelectedCard(e.target.value));
        }}
        checked={item === selectedCard}
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
