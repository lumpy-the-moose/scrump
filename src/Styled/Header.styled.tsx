import styled from 'styled-components';

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 110px;
  margin-bottom: 25px;
`;

export const Auth = styled.div`
  display: flex;
  gap: 10px;
  margin-right: 25px;

  @media screen and (max-width: 499px) {
    flex-direction: column;
  }
`;
