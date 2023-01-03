import styled from 'styled-components';

import { getColor } from '../Common/Colors';

export const StyledTask = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 50px;

  @media screen and (max-width: 499px) {
    flex-direction: column;
    margin-bottom: 25px;
  }
`;

export const TaskDescription = styled.textarea`
  width: 300px;
  min-height: 120px;
  padding: 5px;

  background-color: ${getColor('background')};
  color: ${getColor('text')};
  font-size: 18px;
  box-shadow: inset -5px -5px 15px #ffffffbf, inset 5px 5px 10px #a6b4c8bf;
  border: 1px solid ${getColor('grey')};
  border-radius: 40px;

  resize: none;
  overflow: hidden;
  border-radius: 5px;
  outline: none;

  &::placeholder {
    color: ${getColor('grey')};
  }
`;

export const TaskManage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 499px) {
    flex-direction: row;
  }
`;

export const TaskNotify = styled.div`
  width: 180px;
  height: 30px;
  padding: 5px;

  background-color: ${({ gameStage }) => {
    // eslint-disable-next-line
    switch (gameStage) {
      case 'waiting':
        return getColor('accent');
      case 'voting':
        return getColor('teal');
      case 'results':
        return getColor('green');
    }
  }};
  color: ${getColor('text')};
  box-shadow: -12px -12px 20px #ffffffcc, 10px 10px 20px #a6b4c8b3;
  border-radius: 20px;

  text-align: center;

  @media screen and (max-width: 499px) {
    width: 140px;
  }
`;
