import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useAppSelector, useAppDispatch } from '../App/hooks';
import axios from 'axios';

import { setNickname } from '../App/authSlice';

import LogoElement from '../Common/LogoElement';
import { Form, Input, Button } from '../Common/FormElements';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  let [cookies, setCookie] = useCookies();

  const dispatch = useAppDispatch();
  const { nickname } = useAppSelector(state => state.auth);

  const joinGame = (Authorization: string) => {
    axios(`https://scrum-poker.space/scrum/poker/sessions${location.pathname}`, {
      method: 'GET',
      headers: {
        Authorization,
      },
      data: {
        username: nickname,
      },
    }).then(r => {
      console.log('join');
      console.timeEnd();
      setCookie('PokerSession', r.data.data.id, { path: '/' });
      navigate('/game');
    });
  };

  const logIn = () => {
    axios(`https://scrum-poker.space/api/auth/login`, {
      method: 'POST',
      headers: {
        Authorization: cookies.Authorization,
      },
      data: {
        username: nickname,
      },
    }).then(r => {
      console.log('logIn');
      console.time();
      setCookie('Authorization', r.data.data, { path: '/' });

      if (location.pathname !== '/') {
        joinGame(r.data.data);
      } else {
        navigate('/create');
      }
    });
  };

  return (
    <>
      <LogoElement />
      <Form
        onSubmit={e => {
          e.preventDefault();
          if (nickname) {
            logIn();
          }
        }}
      >
        <Input
          placeholder="Nickname"
          onChange={e => {
            dispatch(setNickname(e.target.value));
            setCookie('nickname', e.target.value, { path: '/' });
          }}
          value={nickname}
        />
        <Button
          type="button"
          onClick={logIn}
          disabled={!nickname}
          text={'Join'}
          width={'150px'}
          height={'45px'}
        />
      </Form>
    </>
  );
}
