import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners"; // Import a spinner from react-loader-spinner

const RandomData = () => {
  const { setResult, data, setData, user } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const getRandomPercentage = () => Math.floor(Math.random() * 101);
  const getRandomAttendance = () => Math.round(Math.random());

  const requestData = {
    ...data,
    student_id: user.id,
    student_email: user.email,
    student_name: user.name,
  };
  const handleSubmit = async () => {
    setLoading(true);
    const response = await axios.post(
      "http://16.171.165.72:4000/api/predict",
      requestData
    );

    console.log(data);
    setResult(response.data);
    setLoading(false);
    toast.success(
      <div>
        <p className="">The AI has generated Prediction</p>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
    if (response.data?.dropout_risk) {
      toast.warning(
        <div>
          <p className="">High Dropout Risk Detected</p>
          <p>Notification sent to {user?.email || "student"}</p>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  useEffect(() => {
    setData({
      lecture_watch_pct: getRandomPercentage(),
      checklist_pct: getRandomPercentage(),
      attended_live_class: getRandomAttendance(),
      attended_group_discussion: getRandomAttendance(),
      qa_participation_pct: getRandomPercentage(),
    });
  }, []);

  return (
    <div className="2xl:mx-30 my-10 shadow p-4 rounded-2xl bg-white">
      <div className="border border-gray-300 rounded-2xl px-10 overflow-hidden">
        <div className="flex flex-col p-7 gap-4">
          <h1 className="text-center text-xl">Weekly Score</h1>
          <div className="h-[3px] w-30 bg-amber-600 mx-auto mb-4"></div>
        </div>
        <div className=" border border-gray-300 rounded-t-xl">
          <table className="w-full">
            <thead className="">
              <tr className="flex flex-col sm:flex-row justify-around items-center rounded-t-2xl w-full bg-[#ECF1F2] p-5">
                {[
                  "Lecture Video Watched",
                  "Checklist Completed",
                  "Attended Live Class",
                  "Attended Group Discussion",
                  "Completed Exercises",
                ].map((header, index) => (
                  <td
                    key={index}
                    className="flex-1 text-center border-b w-full sm:border-r sm:border-b-0 border-gray-300 last:border-r-0 py-2"
                  >
                    {header}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="flex flex-col sm:flex-row justify-around w-full items-center p-5">
                {Object.entries(data).map(([key, value], index) => (
                  <td
                    key={key}
                    className="flex-1 text-center border-b w-full sm:border-r sm:border-b-0 border-gray-300 last:border-r-0 py-2"
                  >
                    {key.includes("attended")
                      ? value === 1
                        ? "Yes"
                        : "No"
                      : `${value}%`}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white my-9 px-10 py-2 rounded block mx-auto flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <ClockLoader color="#ffffff" size={25} />
              <span>Predict Dropout</span>
            </>
          ) : (
            "Predict"
          )}
        </button>
      </div>
    </div>
  );
};

export default RandomData;
