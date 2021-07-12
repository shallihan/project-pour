import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../shared/UIComponents/Button";
import Modal from "../../../shared/UIComponents/Modal";
import Filters from "./Filters";
import { motion } from "framer-motion";
import LogPreview from "./LogPreview";
import React from "react";

const LogList = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  /* const [filterBy, setFilterBy] = useState(""); */
  const [showModal, setShowModal] = useState(false);
  const inputChangeHandler = (event) => {
    setSearchQuery(event.target.value);
  };

  const search = (items) => {
    return items.filter(
      (item) =>
        item.region.toLowerCase().indexOf(searchQuery) > -1 ||
        item.coffee.toLowerCase().indexOf(searchQuery) > -1 ||
        item.process.toLowerCase().indexOf(searchQuery) > -1
    );
  };

  const sortByRating = (items) => {
    const sortedByRating = [].slice.call(items).sort(function (a, b) {
      if (a.ranking < b.ranking) return -1;
      if (a.ranking > b.ranking) return 1;
      return 0;
    });
    console.log(sortedByRating);
    /* items.sort((a, b) => (a.ranking > b.ranking) ? 1 : ((b.ranking > a.ranking) ? -1 : 0)); */
  };

  const openFiltersHandler = () => setShowModal(true);
  const closeFiltersHandler = () => setShowModal(false);

  if (props.items.length === 0) {
    return (
      <div className="log-list__container center">
        <div className="log-list__empty">
          <h2>You haven't created any entries yet.</h2>
          <h2>Why not start now?</h2>

          <div className="log-list__empty-add-button">
            <Button to="/new-entry">ADD MY FIRST ENTRY</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Modal show={showModal} onCancel={closeFiltersHandler}>
        <React.Fragment>
          <Filters />
        </React.Fragment>
      </Modal>
      <motion.div
        className="log-book__container"
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="log-book_filtering">
          <input
            type="text"
            placeholder="Search:"
            onChange={inputChangeHandler}
          />
          <button className="filter-by__button" onClick={openFiltersHandler}>
            {/* <FontAwesomeIcon icon={faFilter} /> */}
            Filter by <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>
        <li className="log-book__headers">
          <h4>Varital</h4>
          <h4>Process</h4>
          <h4>Region</h4>
          <h4 onClick={sortByRating}>
            <span
              className="iconify"
              data-icon="bx-bx-badge-check"
              data-inline="false"
              width="2em"
              height="2em"
            ></span>
          </h4>
        </li>
        <ul className="log-list__container">
          {search(props.items)
            .reverse()
            .map((log) => (
              <LogPreview
                key={log.id}
                id={log.id}
                coffee={log.coffee}
                process={log.process}
                region={log.region}
                ranking={log.ranking}
                creator={log.uid}
                onClick={props.openFullLogHandler}
                closeHandler={props.closeFullLogHandler}
                show={props.showFullLog}
              />
            ))}
        </ul>
        <div className="log-list__add-entry">
          <Button to="/new-entry">ADD NEW ENTRY</Button>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default LogList;
