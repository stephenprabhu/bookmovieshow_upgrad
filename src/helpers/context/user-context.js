import React from "react";

const UserContext = React.createContext({
    user: null,
    setUser: () => { },
    auth: null,
    setAuth: ()=> {}
});

export default UserContext;