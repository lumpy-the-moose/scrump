import Button from '../Common/Button';
import { ReactComponent as Logo } from '../logo.svg';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';

import { setNickname } from '../App/authSlice';

function Home() {
  const navigate = useNavigate();
  let [, setCookie] = useCookies();

  const dispatch = useDispatch();
  const nickname = useSelector(state => state.auth.nickname.payload);

  const toCreate = () => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        if (response.status) {
          alert(response.message);
        } else {
          setCookie('Authorization', response.data, { path: '/' });
          setCookie('nickname', nickname, { path: '/' });
          navigate('/create');
        }
      }
    };

    xhttp.open('POST', 'https://scrum-poker.space/api/auth/login', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(
      JSON.stringify({
        username: nickname,
      })
    );
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <Logo />
          |ScrumP| <br /> |Planning Poker|
        </div>
      </div>
      <form
        className="home__form"
        onSubmit={e => {
          e.preventDefault();
          if (nickname) {
            toCreate();
          }
        }}
      >
        <input
          className="home__field"
          type="text"
          placeholder="Nickname"
          onChange={e => dispatch(setNickname(e.target.value))}
          autoFocus
        />
        <Button className="home__button" text="Join" onClick={toCreate} disabled={!nickname} />
      </form>
      <div className="home__loader"></div>
    </>
  );
}

export default Home;
