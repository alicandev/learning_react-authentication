/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import logoImg from '../img/logo.jpg';
import {
  Card, Logo, Form, Input, Button, Error,
} from '../components/AuthForms';
import { useAuth } from '../context/auth';

const Login = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthTokens } = useAuth();
  const referrer = props.location.state.referrer || '/';

  const postLogin = () => {
    // The url below is supposed to be to a website that distributes tokens
    axios.post('https://www.someplace.com/auth/login', {
      username,
      password,
    }).then((result) => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setIsLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(() => (setIsError(true)));
  };

  if (isLoggedIn) {
    return <Redirect to={referrer} />;
  }

  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input
          type="email"
          value={username}
          onChange={(e) => (setUsername(e.target.value))}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => (setPassword(e.target.value))}
          placeholder="password"
        />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
      <Link to="/signup">Don&apos;t have an account?</Link>
      {isError && <Error>The username or pasword provided were incorrect.</Error>}
    </Card>
  );
};

export default Login;
