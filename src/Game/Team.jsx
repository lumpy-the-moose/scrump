import { useSelector } from 'react-redux';

import { StyledTeam, TeamTitle, User, Answer } from '../Styled/Team.styled';

export default function Team() {
  const { activeUsers, answerVisible } = useSelector(state => state.game);

  const teamMarkup = activeUsers.map(({ nickname, estimate }) => (
    <User key={nickname}>
      {nickname}
      <Answer>{answerVisible ? estimate : false}</Answer>
    </User>
  ));

  return (
    <>
      <TeamTitle>Team</TeamTitle>
      <StyledTeam>{teamMarkup}</StyledTeam>
    </>
  );
}
