import React from 'react';
import { Button } from '../components/AuthForms';
import { useAuth } from '../context/auth';

const Admin = () => {
  const { setAuthTokens } = useAuth();

  const logOut = () => (setAuthTokens());

  return (
    <>
      <div>Admin Page</div>
      <Button onClick={logOut}>Log Out</Button>
    </>
  );
};

export default Admin;
