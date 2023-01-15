import styled from 'styled-components';

import { getColor } from '../Common/Colors';

export const GameInfo = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const GameTitle = styled.h1`
  width: 250px;

  color: ${getColor('text')};

  font-size: 28px;
  text-align: center;
`;

export const GameTitleAccent = styled.span`
  color: ${getColor('accent')};
  overflow-wrap: break-word;
`;
