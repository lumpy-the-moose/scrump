import styled from 'styled-components';

import { getColor } from '../Common/Colors';

export const StyledDeck = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  row-gap: 10px;
  max-width: 500px;
`;

export const DeckTitle = styled.h2`
  margin-bottom: 15px;

  color: ${getColor('text')};
`;

export const DeckInput = styled.input`
  display: none;

  &:checked + label {
    background-color: ${getColor('green')};
  }

  &:disabled + label {
    background-color: ${getColor('grey')};
    box-shadow: none;
  }

  &:disabled:hover + label {
    color: ${getColor('accent')};
  }

  &:disabled:checked + label {
    background-color: ${getColor('green')};
  }
`;

export const DeckLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 70px;

  font-size: 18px;
  box-shadow: inset -4px -4px 9px #ffffffb3, inset 4px 4px 5px #a6b4c8b3;
  border-radius: 20px;

  cursor: pointer;

  transition: all 250ms ease;

  @media screen and (max-width: 499px) {
    width: 40px;
    height: 60px;
  }

  &:hover {
    background-color: ${getColor('teal')};

    @media screen and (max-width: 499px) {
      background-color: transparent;
    }
  }
`;
