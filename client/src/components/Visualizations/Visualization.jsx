import React, { useContext } from "react";
import RadarChart from "../RadarChart/RadarChart";
import BarChart from "../BarChart/Barchart";
import ProgressDoughnut from "../ProgressDoughnut/ProgressDoughnut";

const Visualization = () => {
  return (
    <div className="mt-4 2xl:mx-30 p-4 rounded-xl shadow hidden 2xl:flex flex-col md:flex-row gap-10 bg-white">
      <div className="w-full flex flex-col border border-gray-300 rounded-2xl p-10">
        <h1 className="w-full text-center text-xl">Visualization</h1>
        <div className="h-0.5 w-30 bg-amber-600 mx-auto my-4"></div>
        <div className="mt-10 flex flex-row gap-10">
          <RadarChart />
          <div className="flex flex-col gap-10">
            <BarChart />
            <ProgressDoughnut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualization;
