import React, { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Authentication from "./pages/Authentication/Authentication";
import LogBook from "./pages/LogBook/page/LogBook";
import NewEntry from "./pages/NewEntry/NewEntry";
import MainNavigation from "./shared/Navigation/MainNavigation";
import UserLanding from "./pages/UserLanding/UserLanding";
import { AuthenticationContext } from "./shared/util/authentication-context";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import IndividualEntry from "./pages/IndividualEntry/IndividualEntry";
import './shared/styles/app.scss';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <>
        <MainNavigation />
        <main>
          <AnimatePresence>
          <Switch>
            <Route path="/logbook" exact>
              <UserLanding />
            </Route>
            <Route path="/logbook/:uid" exact>
              <LogBook />
            </Route>
            <Route path="/logbook/:uid/:eid" exact>
              <IndividualEntry/>
            </Route>
            <Route path="/new-entry" exact>
              <NewEntry />
            </Route>
            <Redirect to="/logbook" />
          </Switch>
          </AnimatePresence>
        </main>
      </>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Authentication />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>{routes}</Router>
    </AuthenticationContext.Provider>
  );
}

export default App;
