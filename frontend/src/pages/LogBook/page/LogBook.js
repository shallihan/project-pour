import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import LogList from "../components/LogList";
/* import Button from "../../../shared/UIComponents/Button"; */
import LoadingSpinner from "../../../shared/UIComponents/LoadingSpinner";
import ErrorModal from "../../../shared/UIComponents/ErrorModal";
import { useHttpClient } from "../../../shared/util/http-hook";
import "./LogBook.css";

const LogBook = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEntries, setLoadedEntries] = useState([]);

  const uid = useParams().uid;

  useEffect(() => {
    const fetchUserEntries = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/logs/user/${uid}`
        );
        setLoadedEntries(responseData.logs);
      } catch (err) {}
    };
    fetchUserEntries();
  }, [sendRequest, uid]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <motion.div
          className="user-logbook__container"
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
            <LogList items={loadedEntries} />
        </motion.div>
      )}
    </React.Fragment>
  );
};

export default LogBook;
