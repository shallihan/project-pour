import { useContext } from "react";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "../util/authentication-context";
import Button from "../UIComponents/Button";

const MainNavigation = (props) => {
  const authCtx = useContext(AuthenticationContext);
  return (
    <MainHeader>
      {/* <h2 className="main-navigation__navigation-btn log-book__link">
        <Link to={`/logbook/${authCtx.userId}`}>LOG BOOK</Link>
      </h2> */}
      <h1 className="main-navigation__title">
        <Link to={`/logbook/${authCtx.userId}`} >Good👌Pour</Link>
      </h1>
      <h2 className="main-navigation__navigation-btn">
        <Button onClick={authCtx.logout}>
          SIGN OUT
        </Button>
      </h2>
    </MainHeader>
  );
};

export default MainNavigation;
