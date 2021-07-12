import React, { useState, useCallback, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import Authentication from "./pages/Authentication/Authentication";
import MainNavigation from "./shared/Navigation/MainNavigation";
import UserLanding from "./pages/UserLanding/UserLanding";
import LoadingSpinner from "./shared/UIComponents/LoadingSpinner";
import { AuthenticationContext } from "./shared/util/authentication-context";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./shared/styles/app.scss";

const LogBook = React.lazy(() => import("./pages/LogBook/page/LogBook"));
const NewEntry = React.lazy(() => import("./pages/NewEntry/NewEntry"));
const IndividualEntry = React.lazy(() =>
  import("./pages/IndividualEntry/IndividualEntry")
);

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
                <IndividualEntry />
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
      <Router>
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }
        >
          {routes}
        </Suspense>
      </Router>
    </AuthenticationContext.Provider>
  );
}

export default App;
