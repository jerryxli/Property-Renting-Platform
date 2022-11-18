import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const Login = (props) => {
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const loginBtn = async () => {
    const response = await fetch('http://localhost:5005/user/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
      })
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      props.setTokenFn(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);
      setEmail('');
      setPwd('');
    }
  };

  return (
    <>
      Email: <input type="text" onChange={(event) => setEmail(event.target.value)} value={email} /><br />
      Password: <input type="password" onChange={(event) => setPwd(event.target.value)} value={pwd} /><br />
      <Button variant="outlined" id="login-button" onClick={loginBtn}>Login</Button>
    </>
  );
}

Login.propTypes = {
  setTokenFn: PropTypes.func,
}

export default Login;
