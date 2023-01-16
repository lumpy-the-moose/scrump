import { useAppSelector } from '../App/hooks';

import { StyledTeam, TeamTitle, User, Answer } from '../Styled/Team.styled';

export default function Team() {
  const { gameStage, activeUsers } = useAppSelector(state => state.game);

  const teamMarkup = activeUsers.map(
    ({ nickname, estimate }: { nickname?: any; estimate?: string }) => (
      <User key={nickname}>
        {nickname}
        <Answer>{gameStage === 'results' ? estimate : false}</Answer>
      </User>
    )
  );

  return (
    <>
      <TeamTitle>Team</TeamTitle>
      <StyledTeam>{teamMarkup}</StyledTeam>
    </>
  );
}
