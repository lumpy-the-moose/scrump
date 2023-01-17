import { useCookies } from 'react-cookie';
import { useAppSelector, useAppDispatch } from '../App/hooks';
import axios from 'axios';

import { setSelectedCard } from '../App/gameSlice';

import { StyledDeck, DeckTitle, DeckInput, DeckLabel } from '../Styled/Deck.styled';

export default function Deck() {
  const [cookies] = useCookies();

  const dispatch = useAppDispatch();
  const { gameStage, currentSet, selectedCard } = useAppSelector(
    state => state.game
  );

  const estimate = async (estimate: string) => {
    const r = await axios(
      'https://scrum-poker.space/scrum/poker/sessions/estimate',
      {
        method: 'PATCH',
        headers: {
          Authorization: cookies.Authorization,
        },
        data: {
          estimate,
        },
      }
    );
  };

  const deckMarkup = currentSet.map(item => (
    <div key={item}>
      <DeckInput
        type="radio"
        name="card"
        id={item}
        value={item}
        disabled={gameStage !== 'voting'}
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
