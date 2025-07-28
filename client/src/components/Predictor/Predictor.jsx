import react, { useContext, useState } from "react";
import EngagementForm from "../../components/EngagementForm/EngagementForm";
import Result from "../../components/Results/Results";
import RandomData from "../../components/RandomData/RandomData";
import Visualization from "../Visualizations/Visualization";
import { IoIosArrowDropup } from "react-icons/io";
// import Chatbot from "../chatbot/Chatbot";
const Predictor = () => {
  return (
    <div className="p-10">
      <h1 className="text-2xl text-center mb-4">
        🎓 Student Engagement Analyzer
      </h1>
      <div className="h-0.5 w-30 bg-amber-600 mx-auto mb-4"></div>
      <EngagementForm />
      <RandomData />
      <Result />
      <Visualization />
      {/* <Chatbot /> */}
      {/* Back to top link */}
      <a
        href="#"
        className="max-w-16 fixed bottom-[90px] right-[18px] bg-white rounded-[20px] p-[10px] text-black text-center no-underline text-[13px] z-[1000]"
      >
        <div className="flex flex-col items-center justify-center">
          <IoIosArrowDropup size={50} style={{ marginLeft: "20px" }} />
          Back to Top
        </div>
      </a>
    </div>
  );
};
export default Predictor;
