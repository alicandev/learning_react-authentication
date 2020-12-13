import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import logoImg from '../img/logo.jpg';
import {
  Card, Logo, Form, Input, Button, Error,
} from '../components/AuthForms';
import { useAuth } from '../context/auth';

const SignUp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setAuthTokens } = useAuth();

  const postSignUp = () => {
    axios.post('https://www.someplace/auth/signup', {
      username,
      password,
      confirmPassword,
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
    return <Redirect to="/" />;
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
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => (setConfirmPassword(e.target.value))}
          placeholder="re-enter password"
        />
        <Button onClick={postSignUp}>Sign Up</Button>
        {isError && <Error>The username or pasword provided were incorrect.</Error>}
      </Form>
      <Link to="/login">Already have an account?</Link>
    </Card>
  );
};

export default SignUp;
