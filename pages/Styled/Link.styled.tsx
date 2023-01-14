import styled from 'styled-components';

import { getColor } from '../Common/Colors';

export const StyledLink = styled.div`
  color: ${getColor('grey')};
  transition: all 250ms ease;
  outline: none;
  cursor: pointer;

  &:hover {
    color: ${getColor('accent')};
  }
`;
