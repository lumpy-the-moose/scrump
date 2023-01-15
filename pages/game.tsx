import Refresh from '../components/Game/Refresh';
import Header from '../components/Game/Header';
import Task from '../components/Game/Task';
import Team from '../components/Game/Team';
import Deck from '../components/Game/Deck';

import { useCookies } from 'react-cookie';
import { useAppSelector } from '../components/App/hooks';

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import {
  GameInfo,
  GameTitle,
  GameTitleAccent,
} from '../components/Styled/Game.styled';
import { StyledLink } from '../components/Styled/Link.styled';

export default function Game() {
  const [cookies] = useCookies();

  const { gameName } = useAppSelector(state => state.auth);
  const { refreshing } = useAppSelector(state => state.game);

  return (
    <>
      {refreshing ? <Refresh /> : false}
      <Header />
      <GameInfo>
        <GameTitle>
          Game <GameTitleAccent>{gameName}</GameTitleAccent>
        </GameTitle>
        <StyledLink
          id="gameLink"
          size={'32px'}
          onClick={() => {
            navigator.clipboard.writeText(
              window.location.href.slice(0, -4) + cookies.PokerSession
            );
          }}
        />
        <Tooltip anchorId="gameLink" content="Copy Game Link" place="top" />
      </GameInfo>
      <Task />
      <Team />
      <Deck />
    </>
  );
}
