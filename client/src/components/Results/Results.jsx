import { useContext, useEffect } from "react";
import { useRef } from "react";
import { MdReportProblem } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { AppContext } from "../../Context/AppContext";
import { ToastContainer, toast } from "react-toastify";

export default function Result() {
  const { result } = useContext(AppContext);

  if (!result) return null;

  return (
    <div className="mt-4 2xl:mx-30 p-4 rounded-xl shadow flex flex-col md:flex-row gap-10 bg-white">
      <div className="w-full md:w-[30%] p-5 border border-gray-300 rounded-xl flex flex-col justify-evenly">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-xl text-center mb-4">Dropout Prediction</h2>
          <div className="h-0.5 w-30 bg-amber-600 mx-auto mb-4"></div>
          <h3 className="text-center">
            Dropout Risk:
            <span>
              {result.dropout_risk ? (
                <div className="flex flex-col items-center justify-center w-full">
                  <MdReportProblem className="text-[100px] text-[#FF8500] ml-5" />
                  <p className="text-center w-full text-[#FF8500] font-semibold text-2xl">
                    HIGH
                  </p>
                  <p className="mt-3">
                    ⚠️ The AI may produce wrong predictions.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full">
                  <IoCheckmarkDoneCircle className="text-[100px] text-green-400 ml-5" />
                  <p className="text-center w-full text-green-400 font-semibold text-2xl">
                    LOW
                  </p>
                  <p className="mt-3">
                    ⚠️ The AI may produce wrong predictions.
                  </p>
                </div>
              )}
            </span>
          </h3>
        </div>
        <hr className="border border-gray-300 rounded-xl h-3 mt-7" />
        <div>
          <h2 className="text-xl text-center  mt-10 mb-3">
            Numbe of Recommended Activities
          </h2>
          <div className="h-0.5 w-30 bg-amber-600 mx-auto mb-4"></div>
          <h3 className="text-center">
            Total: {result.recommended_activities.length}
          </h3>
        </div>
      </div>

      <div className="w-full md:w-[70%] border border-gray-300 rounded-xl">
        <h2 className="text-xl mt-10 mb-4 text-center">
          Recommended Activities:
        </h2>
        <div className="h-0.5 w-30 bg-amber-600 mx-auto mb-4"></div>
        <div className="list-disc list-inside grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-7 p-10">
          {result.recommended_activities.map((rec, idx) => (
            <div
              key={idx}
              className="border border-gray-300 flex flex-col md:flex-row text-center md:text-left justify-center gap-7 items-center p-7 rounded-xl"
            >
              {/* <MdChecklist className="text-blue-500 text-7xl" /> */}
              <div className="text-5xl text-[#FF8500]">0{idx + 1}</div>
              <div className="w-px bg-gray-300 h-full self-stretch"></div>
              <p>{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
