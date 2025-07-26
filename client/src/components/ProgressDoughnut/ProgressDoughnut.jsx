import { Doughnut } from "react-chartjs-2";
import { AppContext } from "../../Context/AppContext";
import { useContext } from "react";
const ProgressDoughnut = () => {
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
        data: Object.values(data).map((val) =>
          typeof val === "boolean" ? (val ? 100 : 0) : val
        ),
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FFC107",
          "#9C27B0",
          "#607D8B",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-8 w-[650px] h-[320px] rounded-2xl border border-gray-300 flex flex-col items-center justify-center">
      <h2 className="text-md my-8 text-center">Performance Progress</h2>
      <Doughnut
        data={chartData}
        options={{
          cutout: "50%",
          plugins: {
            legend: {
              position: "right",
            },
          },
        }}
      />
    </div>
  );
};

export default ProgressDoughnut;
