import PropTypes from 'prop-types';
import React from 'react';
import BigButton from '../components/BigButton';

const Register = (props) => {
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [pwd2, setPwd2] = React.useState('');
  const [name, setName] = React.useState('');

  const registerBtn = async () => {
    const response = await fetch('http://localhost:5005/user/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
        name: name,
      })
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      props.setTokenFn(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);
    }
  };

  const checkRegister = () => {
    if (pwd === pwd2) {
      registerBtn();
      setEmail('');
      setPwd('');
      setPwd2('');
      setName('');
    } else {
      alert('Passwords do not match');
    }
  }

  return (
    <>
      Email: <input type="text" onChange={(event) => setEmail(event.target.value)} value={email} /><br />
      Password: <input type="password" onChange={(event) => setPwd(event.target.value)} value={pwd} /><br />
      Confirm Password: <input type="password" onChange={(event) => setPwd2(event.target.value)} value={pwd2} /><br />
      Name: <input type="text" onChange={(event) => setName(event.target.value)} value={name} /><br />
      <BigButton onClick={checkRegister}>Register</BigButton>
    </>
  );
}

Register.propTypes = {
  setTokenFn: PropTypes.func,
};

export default Register;
