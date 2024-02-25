import { motion, AnimatePresence } from "framer-motion";
const Alert = ({ title, status }) => {
  return (
    <>
      <AnimatePresence>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`py-2 fixed top-[5%] -translate-x-1/2 left-[45%] px-6 text-white rounded-md ${
            status == "success" ? "bg-emerald-600" : "bg-red-500"
          }`}
        >
          {title}
        </motion.p>
      </AnimatePresence>
    </>
  );
};

export default Alert;
