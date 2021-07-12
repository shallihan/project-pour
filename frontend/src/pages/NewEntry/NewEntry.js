import React from "react";
import { motion } from "framer-motion";
import Form from "../../shared/UIComponents/Form";

const NewEntry = () => {
  return (
    <React.Fragment>
      <motion.div
        className="full-log__container"
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Form />
      </motion.div>
    </React.Fragment>
  );
};

export default NewEntry;
