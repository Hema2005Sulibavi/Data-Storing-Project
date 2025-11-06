import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DisplayPage() {
  const [students, setStudents] = useState([]);
  const [showPasswords, setShowPasswords] = useState({}); // store visibility per student

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("studentList")) || [];
    setStudents(storedData);
  }, []);

  const clearData = () => {
    localStorage.removeItem("studentList");
    setStudents([]);
  };

  const togglePassword = (index) => {
    setShowPasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 via-lime-300 to-emerald-300 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700 drop-shadow-md">
          📋 Stored Student Details
        </h2>

        {students.length > 0 ? (
          <div className="space-y-4">
            {students.map((student, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-gray-200 shadow-md bg-gradient-to-r from-green-100 to-green-200"
              >
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>USN:</strong> {student.usn}</p>
                <p><strong>Mobile:</strong> {student.mobile}</p>
                <p><strong>Email:</strong> {student.email}</p>

                <div className="flex items-center gap-2">
                  <p>
                    <strong>Password:</strong>{" "}
                    <span
                      className={`${
                        showPasswords[index]
                          ? "text-gray-800"
                          : "blur-sm select-none text-gray-400"
                      }`}
                    >
                      {student.password}
                    </span>
                  </p>
                  <button
                    onClick={() => togglePassword(index)}
                    className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {showPasswords[index] ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No student data found. Please fill the form.
          </p>
        )}

        <div className="flex justify-between mt-8">
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            ➕ Add New Student
          </Link>

          <button
            onClick={clearData}
            className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition"
          >
            🗑️ Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
}
