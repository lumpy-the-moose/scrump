import { StyledLogoElement } from '../Styled/LogoElement.styled';
import Image from 'next/image';

export default function LogoElement() {
  return (
    <StyledLogoElement>
      <Image src={'logo.svg'} alt={'project logo'} width={64} height={64} />
      |ScrumP|
      <br />
      Planning
      <br />
      Poker
    </StyledLogoElement>
  );
}
