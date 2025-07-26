import { useEffect } from "react";
import Home from "../src/pages/Home/Home";
import { useContext } from "react";
import { AppContext, AppProvider } from "./Context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);
  return (
    <div
      className={
        darkMode ? "!bg-[#1F242D] !text-white" : "bg-[#F8F9FA] text-black"
      }
    >
      <ToastContainer />
      <Home />
    </div>
  );
};

export default App;
