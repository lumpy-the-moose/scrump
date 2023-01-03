import styled from 'styled-components';

import { getColor } from '../Common/Colors';

export const StyledTeam = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 50px;

  @media screen and (max-width: 499px) {
    margin-bottom: 25px;
  }
`;

export const TeamTitle = styled.h2`
  margin-bottom: 15px;

  color: ${getColor('text')};
`;

export const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-width: 150px;
  height: 50px;
  padding: 0 10px 0 20px;

  background-color: ${getColor('accent')};
  color: ${getColor('text')};
  font-family: 'KoHo', sans-serif;
  font-size: 18px;
  text-align: center;
  box-shadow: -12px -12px 20px #ffffffcc, 10px 10px 24px #a6b4c8b3;
  border-radius: 40px;
`;

export const Answer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin-left: auto;

  background-color: ${getColor('background')};
  box-shadow: inset -4px -4px 9px #ffffffb3, inset 4px 4px 5px #a6b4c8b3;
  border-radius: 20px;
`;
