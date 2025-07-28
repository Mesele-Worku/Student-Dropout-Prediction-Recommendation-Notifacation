import { useEffect } from "react";
import Home from "../src/pages/Home/Home";
import { useContext } from "react";
import { AppContext, AppProvider } from "./Context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);
  useEffect(() => {
    // Initialize Chatbase script
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = function () {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(arguments);
      };

      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") {
            return target.q;
          }
          return function () {
            return target.apply(this, [prop].concat(Array.from(arguments)));
          };
        },
      });
    }

    const onLoad = () => {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "PQI6_pJ_jQ32U8qNjCL1i";
      script.setAttribute("domain", "www.chatbase.co");
      script.defer = true;
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      const script = document.getElementById("PQI6_pJ_jQ32U8qNjCL1i");
      if (script) {
        document.body.removeChild(script);
      }
      window.removeEventListener("load", onLoad);
    };
  }, []);
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
