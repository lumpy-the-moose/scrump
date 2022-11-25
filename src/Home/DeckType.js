import Radio from '../Common/Radio';

import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

  const data = deckTypeData.map((item, index) => (
    <div className="deck-type__box">
      <Radio
        name="dt"
        inputClassName="deck-type__input"
        labelClassName="deck-type__label"
        key={item.value}
        value={item.value}
        text={item.btnText}
        defaultChecked={index === 0}
        onChange={e => {
          dispatch(setDeckType(e.target.value));
        }}
      />
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
