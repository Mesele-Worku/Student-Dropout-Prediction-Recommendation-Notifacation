import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler);

const RadarChart = () => {
  const { data } = useContext(AppContext);
  if (!data) {
    return (
      <div className="p-8 w-[700px] h-[700px] border rounded-2xl border-gray-300 flex items-center justify-center">
        <p className="text-gray-500 text-lg">No data available yet</p>
      </div>
    );
  }
  const chartData = {
    labels: Object.keys(data).map((key) => key.replace(/_/g, " ")),
    datasets: [
      {
        label: "Weekly Performance",
        data: Object.values(data),
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-8 w-[570px] h-[700px] border rounded-2xl border-gray-300">
      <h2 className="text-md my-8 text-center">
        Performance Radar Chart
      </h2>
      <Radar data={chartData} />
    </div>
  );
};
export default RadarChart;
