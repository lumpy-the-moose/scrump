import styled from 'styled-components';

import { getColor } from '../Common/Colors';

import { ButtonProps } from '../Common/FormElements';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
`;

export const StyledInput = styled.input`
  width: 150px;
  height: 45px;
  margin-bottom: 20px;
  padding: 0 10px;

  font-size: 18px;
  font-weight: 700;
  text-align: center;

  background-color: ${getColor('background')};
  color: ${getColor('text')};
  box-shadow: inset -5px -5px 15px #ffffffbf, inset 5px 5px 10px #a6b4c8bf;
  border: 1px solid ${getColor('grey')};
  border-radius: 40px;
  outline: none;

  &::placeholder {
    color: ${getColor('grey')};
  }
`;

export const StyledButton = styled.button<ButtonProps>`
  display: ${({ display }) => display};
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  background-color: ${getColor('background')};
  box-shadow: -12px -12px 20px #ffffffcc, 10px 10px 20px #a6b4c8b3;
  border: none;
  border-radius: 40px;
  white-space: nowrap;

  cursor: pointer;

  transition: all 250ms ease;

  @media screen and (max-width: 499px) {
    width: ${({ mobileWidth }) => mobileWidth};
  }

  &:hover {
    background-color: ${getColor('accent')};
  }

  &:disabled {
    background-color: ${getColor('grey')};
    box-shadow: none;

    &:hover {
      color: ${getColor('accent')};
    }
  }
`;
