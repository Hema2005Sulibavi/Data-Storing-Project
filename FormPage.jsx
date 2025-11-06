import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormPage() {
  const [student, setStudent] = useState({
    name: "",
    usn: "",
    mobile: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch old data (if any)
    const existingData = JSON.parse(localStorage.getItem("studentList")) || [];

    // Add new student to array
    existingData.push(student);

    // Save back to localStorage
    localStorage.setItem("studentList", JSON.stringify(existingData));

    // Navigate to display page
    navigate("/display");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-white/30"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-700 drop-shadow-md">
          🎓 Student Registration
        </h2>

        {["name", "usn", "mobile", "email", "password"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700 font-semibold capitalize mb-1">
              {field}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={student[field]}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-2 focus:ring-purple-400 outline-none"
              placeholder={`Enter your ${field}`}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-md font-semibold hover:scale-105 transition-transform duration-200"
        >
          Save & View Data
        </button>
      </form>
    </div>
  );
}
