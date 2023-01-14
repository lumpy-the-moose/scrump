import { useCookies } from 'react-cookie';
import { useAppSelector, useAppDispatch } from '../App/hooks';
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
import React from 'react';

export default function DeckType() {
  const [cookies] = useCookies();

  const dispatch = useAppDispatch();
  const { setsData, deckType } = useAppSelector(state => state.auth);

  async function estimateSets() {
    axios('https://scrum-poker.space/scrum/poker/estimate/sets', {
      method: 'GET',
      headers: {
        Authorization: cookies.Authorization,
      },
    }).then(r => {
      dispatch(updateSetsData({ ...r.data.data }));
    });
  }

  useEffect(() => {
    estimateSets();
    // eslint-disable-next-line
  }, []);

  const setsMarkup = Object.entries(setsData).map((item: [string, any], index) => (
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

  type SetsProps = {
    children: React.ReactNode;
  };

  const Sets: React.FC<SetsProps> = ({ children }) => {
    return <StyledDeckType>{children}</StyledDeckType>;
  };

  return (
    <Sets>
      Choose Deck
      {setsMarkup}
    </Sets>
  );
}
