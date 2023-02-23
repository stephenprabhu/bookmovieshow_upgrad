import { useState } from "react";
import UserContext from "./user-context";
import React from 'react';

const UserProvider = (props) => {
  const [auth, setAuth] = useState(null);

  const userContext = {
    auth,
    setAuth,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider;