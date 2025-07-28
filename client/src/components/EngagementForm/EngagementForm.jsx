import { useState, useContext } from "react";
import axios from "axios";
import learning from "../../assets/learning-4.png";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners"; // Import a spinner from react-loader-spinner

export default function EngagementForm() {
  const { setResult, user, result } = useContext(AppContext);
  const [form, setForm] = useState({
    lecture_watch_pct: "",
    checklist_pct: "",
    attended_live_class: 0,
    attended_group_discussion: 0,
    qa_participation_pct: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsed = name.includes("attended") ? parseInt(value) : Number(value);
    setForm({ ...form, [name]: parsed });
  };

  // Include user information with the prediction request
  const requestData = {
    ...form,
    student_id: user.id,
    student_email: user.email,
    student_name: user.name,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(
      "http://34.227.48.46:4000/api/predict",
      requestData
    );
    console.log(form);
    setResult(res.data);
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
    if (res.data?.dropout_risk) {
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

  return (
    <div className="mx-0 2xl:mx-30 p-2 flex flex-col md:items-stretch items-center md:flex-row justify-between gap-10 2xl:gap-12">
      <div className="w-full h-[550px] md:w-[60%]">
        <img src={learning} alt="" className="w-full h-full rounded-xl" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="px-10 py-7 shadow rounded-xl border border-gray-300 w-full h-full md:w-[40%] bg-white"
      >
        {Object.keys(form).map((key) => (
          <div key={key} className="mb-5">
            <label className="block text-[17px] mb-1">
              {key.replace(/_/g, " ")}
            </label>
            <input
              type="number"
              name={key}
              value={form[key]}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full p-2 border border-gray-300 outline-[#FF8F15] rounded-md"
            />
          </div>
        ))}
        <button
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded flex justify-center w-full mx-auto"
        >
          {loading ? (
            <>
              <ClockLoader color="#ffffff" size={25} /> <span>Predict Dropout</span>
            </>
          ) : (
            "Predict Dropout"
          )}
        </button>
      </form>
    </div>
  );
}
