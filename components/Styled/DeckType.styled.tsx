import styled from 'styled-components';

import { getColor } from '../Common/Colors';

export const StyledDeckType = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 10px;

  color: ${getColor('text')};
`;

export const DeckTypeWrapper = styled.div`
  position: relative;
`;

export const DeckTypeInput = styled.input`
  display: none;

  &:checked ~ div > div {
    background-color: ${getColor('teal')};
  }
`;

export const DeckTypeLabel = styled.label`
  display: flex;
  align-items: center;
  width: 300px;
  height: 50px;
  padding: 10px 10px 10px 60px;

  font-size: 16px;
  cursor: pointer;

  background-color: ${getColor('background')};
  box-shadow: -12px -12px 20px #ffffffcc, 10px 10px 20px #a6b4c8b3;
  border-radius: 40px;
`;

export const CustomLabel = styled.div`
  position: absolute;
  top: 9px;
  left: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: ${getColor('background')};
  box-shadow: inset -4px -4px 9px #ffffffb3, inset 4px 4px 5px #a6b4c8b3;
  border-radius: 40px;
`;

export const CustomDot = styled.div`
  width: 17px;
  height: 17px;
  background-color: ${getColor('grey')};
  border-radius: 40px;

  transition: all 250ms ease;
`;
