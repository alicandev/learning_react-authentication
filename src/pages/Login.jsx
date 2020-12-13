import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import logoImg from '../img/logo.jpg';
import {
  Card, Logo, Form, Input, Button, Error,
} from '../components/AuthForms';
import { useAuth } from '../context/auth';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);
  const { setAuthTokens } = useAuth();

  const postLogin = () => {
    // The url below is supposed to be to a website that distributes tokens
    axios.post('https://www.someplace.com/auth/login' , {
      userName: username,
      password,
    }).then((result) => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setIsLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(() => {
      setIsError(true);
    });
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input type="email" placeholder="email" />
        <Input type="password" placeholder="password" />
        <Button>Sign In</Button>
      </Form>
      <Link to="/signup">Don&apos;t have an account?</Link>
    </Card>
  );
};

export default Login;
