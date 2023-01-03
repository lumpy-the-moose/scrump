import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setSelectedCard, updateActiveUsers } from '../App/gameSlice';

import { StyledDeck, DeckTitle, DeckInput, DeckLabel } from '../Styled/Deck.styled';

export default function Deck() {
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
      <DeckInput
        type="radio"
        name="card"
        id={item}
        value={item}
        disabled={deckDisabled}
        onChange={e => {
          estimate(e.target.value);
          dispatch(setSelectedCard(e.target.value));
        }}
        checked={item === selectedCard}
      />
      <DeckLabel htmlFor={item}>{item}</DeckLabel>
    </div>
  ));

  return (
    <>
      <DeckTitle>Pick Your Card</DeckTitle>
      <StyledDeck>{deckMarkup}</StyledDeck>
    </>
  );
}
