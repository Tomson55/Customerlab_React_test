import { useState } from "react";
import SegmentForm from "./components/SegmentForm";
import "./App.css";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <button className="save-button" onClick={handleShow}>
        Save Segment
      </button>

      {show && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleClose}>
              &times;
            </span>
            <SegmentForm closePopup={handleClose} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
