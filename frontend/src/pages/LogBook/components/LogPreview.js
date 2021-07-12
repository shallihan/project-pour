import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "../../../shared/util/authentication-context";

const LogPreview = (props) => {
  const authCtx = useContext(AuthenticationContext);
  const {id} = props;
  
  return (
    <React.Fragment>
      <Link to={`/logbook/${authCtx.userId}/${id}`} >
      <li className="log-preview__container">
        <div className="log-preview__content">
          <p>{props.coffee}</p>
          <p>{props.process}</p>
          <p>{props.region}</p>
          <p className="log-preview__ranking">{props.ranking}</p>
        </div>
      </li>
      </Link>
    </React.Fragment>
  );
};

export default LogPreview;
