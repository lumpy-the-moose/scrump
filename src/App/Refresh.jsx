import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

import { setGameId, setIsAdmin } from './authSlice';
import { updateActiveUsers, updateCurrentSet } from './gameSlice';

export default function Refresh() {
  let [cookies] = useCookies();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(cookies.PokerSession);
    axios(`https://scrum-poker.space/scrum/poker/sessions/${cookies.PokerSession}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Authorization: cookies.Authorization,
      },
    }).then(r => {
      console.log(r.data.data);

      dispatch(setGameId(r.data.data.name));
      dispatch(
        setIsAdmin(
          r.data.data.users.filter(user => user.admin)[0].nickname ===
            cookies.nickname
        )
      );
      dispatch(updateActiveUsers(r.data.data.users));
      dispatch(updateCurrentSet(r.data.data.estimates));
    });
    // eslint-disable-next-line
  }, []);
}
