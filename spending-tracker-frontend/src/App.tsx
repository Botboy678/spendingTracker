import Navbar from "./components/Navbar";
import Modal from "./components/Modals/Modal";
import { useState } from "react";
import './css/App.css'
import { AnimatePresence, motion } from "framer-motion";
import { ExpandIcon } from "./assets/icons/Icons";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg">
        <div className="navbar-wrapper">
          <Navbar userName="Manny" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-outline-success rounded-15 mt-3 border-0"
            id="view-table-btn" onClick={() => setShowModal(true)}>
            <ExpandIcon size={40} color="#6edf88" />
          </motion.button>
          <AnimatePresence>
            {showModal && (
              <Modal onClose={() => setShowModal(false)} />
            )}
          </AnimatePresence>
        </div>
      </div >
    </>
  )
}
export default App;