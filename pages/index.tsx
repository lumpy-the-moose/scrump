import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useAppSelector, useAppDispatch } from '../components/App/hooks';
import { useEffect } from 'react';
import axios from 'axios';

import { setNickname } from '../components/App/authSlice';

import LogoElement from '../components/Common/LogoElement';
import { Form, Input, Button } from '../components/Common/FormElements';

export default function Home() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies();

  const dispatch = useAppDispatch();
  const { nickname } = useAppSelector(state => state.auth);

  useEffect(() => {
    router.prefetch('/create');
  }, []);

  const logIn = async () => {
    axios(`https://scrum-poker.space/api/auth/login`, {
      method: 'POST',
      headers: {
        Authorization: cookies.Authorization,
      },
      data: {
        username: nickname,
      },
    })
      .then(r => {
        console.log(`%c LogIN`, `color: green`);
        setCookie('Authorization', r.data.data, { path: '/' });
      })
      .then(() => {
        router.push('/create');
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
          type="submit"
          disabled={!nickname}
          text={'Join'}
          width={'150px'}
          height={'45px'}
        />
      </Form>
    </>
  );
}
