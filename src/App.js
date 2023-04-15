import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Upload from "./Upload";
import View from "./View";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import "./styles.css";
const App = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(100);
  }, []);
  return (
    <>
      <LoadingBar
        color="red"
        height={2}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home setProgress={setProgress} />} />
        <Route
          exact
          path="/upload"
          element={<Upload setProgress={setProgress} />}
        />
        <Route
          exact
          path="/watch"
          element={<View setProgress={setProgress} />}
        />
      </Routes>
    </>
  );
};

export default App;
