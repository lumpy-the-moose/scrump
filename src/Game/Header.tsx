import { useCookies } from 'react-cookie';
import { useAppSelector, useAppDispatch } from '../App/hooks';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { setNickname, setGameName } from '../App/authSlice';

import LogoElement from '../Common/LogoElement';
import { StyledHeader, Auth } from '../Styled/Header.styled';
import { Button } from '../Common/FormElements';

export default function Header() {
  let [cookies] = useCookies();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector(state => state.auth);

  const Create = () => {
    closeSession();
    dispatch(setGameName(''));
    navigate('/create');
  };

  const Home = () => {
    if (isAdmin) closeSession();
    dispatch(setNickname(''));
    dispatch(setGameName(''));
    navigate('/');
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
