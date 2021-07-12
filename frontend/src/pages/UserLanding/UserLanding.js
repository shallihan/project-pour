import "./UserLanding.css";
import { motion } from "framer-motion";

const UserLanding = () => {
  return (
    <motion.div
      className="center"
      initial={{ opacity: 0}}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Logbook</h1>
    </motion.div>
  );
};

export default UserLanding;
