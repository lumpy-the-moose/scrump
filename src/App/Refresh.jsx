import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

import { setGameName, setIsAdmin } from './authSlice';
import {
  setTaskMessage,
  updateActiveUsers,
  updateCurrentSet,
  toVoting,
} from './gameSlice';

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

      dispatch(setGameName(r.data.data.name));
      dispatch(setTaskMessage(r.data.data.taskDescription || ''));
      dispatch(updateActiveUsers(r.data.data.users));
      dispatch(updateCurrentSet(r.data.data.estimates));
      dispatch(
        setIsAdmin(
          r.data.data.users.filter(user => user.admin)[0].nickname ===
            cookies.nickname
        )
      );
      if (r.data.data.estimatingInProgress) {
        dispatch(toVoting());
      }
    });

    // eslint-disable-next-line
  }, []);
}
