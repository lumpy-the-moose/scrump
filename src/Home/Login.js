import Button from '../Common/Button';
import { ReactComponent as Logo } from '../logo.svg';

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Login(props) {
  const navigate = useNavigate();

  let [, setCookie] = useCookies();

  const toLogin = () => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        if (response.status) {
          alert(response.message);
        } else {
          setCookie('Authorization', response.data, { path: '/' });
          navigate('/login');
        }
      }
    };

    xhttp.open('POST', 'http://185.25.116.234:8080/api/auth/login', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(
      JSON.stringify({
        username: props.nickname,
      })
    );
  };

  return (
    <div className="login">
      <div className="logo">
        <Logo />
        |ScrumP| <br /> |Planning Poker|
      </div>
      <form
        className="login__form"
        onSubmit={e => {
          e.preventDefault();
          if (props.nickname) {
            toLogin();
          }
        }}
      >
        <input
          className="login__field"
          type="text"
          placeholder="Nickname"
          onChange={e => props.setNickname(e.target.value)}
          autoFocus
        />
        <Button
          className="login__button"
          text="Join"
          onClick={toLogin}
          disabled={!props.nickname}
        />
      </form>
      <div className="login__loader"></div>
    </div>
  );
}

export default Login;
