import React from "react";

const UserContext = React.createContext({
    auth: null,
    setAuth: () => { }
});

export default UserContext;