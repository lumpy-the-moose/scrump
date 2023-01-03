import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

import { setDeckType, updateSetsData } from '../App/authSlice';

import {
  StyledDeckType,
  DeckTypeWrapper,
  DeckTypeInput,
  DeckTypeLabel,
  CustomLabel,
  CustomDot,
} from '../Styled/DeckType.styled';

export default function DeckType() {
  let [cookies] = useCookies();

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
    <DeckTypeWrapper key={item[0]}>
      <DeckTypeInput
        type="radio"
        name="set"
        id={item[0]}
        value={item[0]}
        checked={
          deckType
            ? item[0] === deckType
            : cookies.deckType
            ? item[0] === cookies.deckType
            : index === 0
        }
        onChange={e => {
          dispatch(setDeckType(e.target.value));
        }}
      />
      <DeckTypeLabel htmlFor={item[0]}>{item[1].join(' ')}</DeckTypeLabel>
      <CustomLabel>
        <CustomDot />
      </CustomLabel>
    </DeckTypeWrapper>
  ));

  const Sets = ({ children }) => {
    return <StyledDeckType>{children}</StyledDeckType>;
  };

  return (
    <Sets>
      Choose Deck
      {setsMarkup}
    </Sets>
  );
}
