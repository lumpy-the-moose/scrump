import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

import { setDeckType, updateSetsData } from '../App/authSlice';

function DeckType() {
  let [cookies, setCookie] = useCookies();

  const dispatch = useDispatch();
  const { setsData, deckType } = useSelector(state => state.auth);

  useEffect(() => {
    async function estimateSets() {
      axios('https://scrum-poker.space/scrum/poker/estimate/sets', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Authorization: cookies.Authorization,
        },
      }).then(r => {
        dispatch(updateSetsData({ ...r.data.data }));
      });
    }

    estimateSets();
    // eslint-disable-next-line
  }, []);

  const setsMarkup = Object.entries(setsData).map((item, index) => (
    <div className="deck-type__box" key={item[0]}>
      <input
        type="radio"
        name="set"
        id={item[0]}
        value={item[0]}
        className="deck-type__input"
        checked={
          deckType
            ? item[0] === deckType
            : cookies.deckType
            ? item[0] === cookies.deckType
            : index === 0
        }
        onChange={e => {
          dispatch(setDeckType(e.target.value));
          setCookie('deckType', e.target.value, { path: '/' });
        }}
      />
      <label htmlFor={item[0]} className="deck-type__label">
        {item[1].join(' ')}
      </label>
      <div className="deck-type__custom-input">
        <div className="deck-type__custom-dot"></div>
      </div>
    </div>
  ));

  return (
    <div className="deck-type">
      Choose Deck
      {setsMarkup}
    </div>
  );
}

export default DeckType;
