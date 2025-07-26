import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { AppContext } from "../../Context/AppContext";
import { useContext } from "react";

function BarChart() {
  const { data } = useContext(AppContext);
  if (!data) {
    return (
      <div className="p-8 w-[700px] h-[700px] border rounded-2xl border-gray-300 flex items-center justify-center">
        <p className="text-gray-500 text-lg">No data available yet</p>
      </div>
    );
  }
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "User Metrics",
        data: Object.values(data),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
      },
    ],
  };

  return (
    <div className="p-8 w-[650px] h-[340px] border rounded-2xl border-gray-300">
      <h2 className="text-md text-center">Performance Bar Chart</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default BarChart;
