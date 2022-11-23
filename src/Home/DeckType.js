import Radio from '../Common/Radio';

function DeckType(props) {
  const data = props.deckTypeData.map((item, index) => (
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
          props.setDeckType(e.target.value);
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
