import React, { useContext, useEffect } from "react";
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";
import UserContext from "../helpers/context/user-context";

const Controller = () => {
  const baseUrl = "/api/v1/";
  const ctx = useContext(UserContext);

  useEffect(()=> {
    if(window.sessionStorage.getItem("access-token")){
      ctx.setAuth(window.sessionStorage.getItem("access-token"));
    }
  },[]);

  return (
    <Router>
      <div className="main-container">
      <Route
          exact
          path="/"
          render={(props) => <Home {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/movie/:id"
          render={(props) => <Details {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/bookshow/:id"
          render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/confirm/:id"
          render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
        />
      </div>
    </Router>
  );
};

export default Controller;
