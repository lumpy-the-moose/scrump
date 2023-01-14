import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useAppSelector, useAppDispatch } from '../App/hooks';
import axios from 'axios';

import { setNickname, setGameName } from '../App/authSlice';

import LogoElement from '../Common/LogoElement';
import { StyledHeader, Auth } from '../Styled/Header.styled';
import { Button } from '../Common/FormElements';

export default function Header() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies();

  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector(state => state.auth);

  const Create = () => {
    if (isAdmin) closeSession();
    dispatch(setGameName(''));
    router.push('/create');
  };

  const Home = () => {
    if (isAdmin) closeSession();
    dispatch(setNickname(''));
    dispatch(setGameName(''));
    setCookie('Authorization', '', { path: '/' });
    router.push('/');
  };

  function closeSession() {
    axios('https://scrum-poker.space/scrum/poker/sessions', {
      method: 'DELETE',
      headers: {
        Authorization: cookies.Authorization,
      },
    });
  }

  return (
    <StyledHeader>
      <LogoElement />
      <Auth>
        <Button
          type="button"
          onClick={Create}
          text={'New Game'}
          width={'110px'}
          height={'40px'}
        />
        <Button
          type="button"
          onClick={Home}
          text={'Log Out'}
          width={'110px'}
          height={'40px'}
        />
      </Auth>
    </StyledHeader>
  );
}
