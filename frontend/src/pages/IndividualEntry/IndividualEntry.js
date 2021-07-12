import React from "react";
import { motion } from 'framer-motion';
import FullLog from "../LogBook/components/FullLog";
const IndividualEntry = () => {
  return (
    <motion.div
      className="full-log__container"
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <FullLog />
    </motion.div>
  );
};

export default IndividualEntry;
