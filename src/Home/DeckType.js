import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';

import { setDeckType } from '../App/authSlice';

const deckTypeData = [
  {
    value: 'mod',
    btnText: '0 ½ 1 2 3 5 8 13 20 40 100 ? ☕',
  },
  {
    value: 'fibo',
    btnText: '0 1 2 3 5 8 13 21 34 55 89 ? ☕',
  },
  {
    value: 'powers',
    btnText: '0 1 2 4 8 16 32 64 ? ☕',
  },
];

function DeckType() {
  let [cookies, setCookie] = useCookies();

  const dispatch = useDispatch();
  const deckType = useSelector(state => state.auth.deckType.payload);

  const data = deckTypeData.map((item, index) => (
    <div className="deck-type__box" key={item.value}>
      <input
        type="radio"
        name="set"
        id={item.value}
        value={item.value}
        className="deck-type__input"
        checked={
          deckType
            ? item.value === deckType
            : cookies.deckType
            ? item.value === cookies.deckType
            : index === 0
        }
        onChange={e => {
          dispatch(setDeckType(e.target.value));
          setCookie('deckType', e.target.value, { path: '/' });
        }}
      />
      <label htmlFor={item.value} className="deck-type__label">
        {item.btnText}
      </label>
      <div className="deck-type__custom-input">
        <div className="deck-type__custom-dot"></div>
      </div>
    </div>
  ));

  return (
    <div className="deck-type">
      Choose Deck
      {data}
    </div>
  );
}

export default DeckType;
