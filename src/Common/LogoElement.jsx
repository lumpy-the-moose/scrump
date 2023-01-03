import { ReactComponent as Logo } from '../logo.svg';
import { StyledLogoElement } from '../Styled/LogoElement.styled';

export default function LogoElement() {
  return (
    <StyledLogoElement>
      <Logo />
      |ScrumP|
      <br />
      Planning
      <br />
      Poker
    </StyledLogoElement>
  );
}
