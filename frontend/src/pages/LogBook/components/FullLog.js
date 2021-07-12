import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Item from "../../../shared/UIComponents/Item";
import Button from "../../../shared/UIComponents/Button";
import LoadingSpinner from "../../../shared/UIComponents/LoadingSpinner";
import ErrorModal from "../../../shared/UIComponents/ErrorModal";
import { AuthenticationContext } from "../../../shared/util/authentication-context";
import { useHttpClient } from "../../../shared/util/http-hook";
import { useParams } from "react-router-dom";

const FullLog = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const authCtx = useContext(AuthenticationContext);
  const [loadedEntry, setLoadedEntry] = useState([]);
  const eid = useParams().eid;

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/logs/${eid}`
        );
        setLoadedEntry(responseData.log);
      } catch (err) {}
    };
    fetchEntry();
  }, [sendRequest, eid]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="full-log__form">
        <div className="full-log__inputs-section">
          <div className="full-log__inputs-details">
            {isLoading && <LoadingSpinner asOverlay />}
            <Item label="Varietal:">{loadedEntry.coffee}</Item>
            <Item label="Region:">{loadedEntry.region}</Item>
            <Item label="Roaster:">{loadedEntry.roaster}</Item>
          </div>
          <div className="full-log__inputs-details">
            <Item label="Process:">{loadedEntry.process}</Item>
            <Item label="Roasted:">{loadedEntry.roastDate}</Item>
            <Item label="Roast Level:">{loadedEntry.roastLevel}</Item>
          </div>
        </div>
        <div className="full-log__inputs-section">
          <div className="full-log__inputs-details">
            <Item label="Method:">{loadedEntry.method}</Item>
            <Item label="Ratio:">{loadedEntry.ratio}</Item>
            <Item label="Grind Size:">{loadedEntry.grindSize}</Item>
            <Item label="Water Temperature:">{loadedEntry.temperature}&#176;C</Item>
          </div>
          <div className="full-log__inputs-details">
            <label htmlFor="notes">Recipe Notes</label>
            <Item type="blockquote">{loadedEntry.notes}</Item>
            <Item label="Personal Ranking: ">{loadedEntry.ranking}</Item>
          </div>
        </div>
        <div className="full-log__form-buttons">
          <Link to={`/logbook/${authCtx.userId}`}>
            <Button className="full-log__cancel-button">GO BACK</Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FullLog;
