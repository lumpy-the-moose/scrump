import styled from 'styled-components';
import { Link } from '@styled-icons/entypo';

import { getColor } from '../Common/Colors';

export const StyledLink = styled(Link)`
  color: ${getColor('grey')};
  transition: all 250ms ease;
  outline: none;
  cursor: pointer;

  &:hover {
    color: ${getColor('accent')};
  }
`;
