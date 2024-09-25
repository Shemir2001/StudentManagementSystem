import React, { useState, useEffect } from "react";
import { app, firestore } from "../../firebase/Firebase";
import { useParams } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const [userdata, setuderData] = useState({
    Name: "",
    RollNo: "",
    Email: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setmessage] = useState("");

  const handlechanges = (e) => {
    setuderData({ ...userdata, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    const ref = doc(firestore, "Users", id);
    const gData = await getDoc(ref);
    setuderData({
      Name: gData.data().Name,
      RollNo: gData.data().RollNo,
      Email: gData.data().Email,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const updateData = () => {
    const ref = doc(firestore, "Users", id);
    updateDoc(ref, {
      Name: userdata.Name,
      RollNo: userdata.RollNo,
      Email: userdata.Email,
    });
    setmessage("User updated successfully");
    setTimeout(() => {
      setmessage("");
      navigate("/");
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center h-full ml-24">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Update User</h2>
          <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
            <svg onClick={() => navigate("/")}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              onChange={handlechanges}
              type="text"
              id="name"
              name="Name"
              value={userdata.Name}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              onChange={handlechanges}
              type="email"
              id="email"
              name="Email"
              value={userdata.Email}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label
              htmlFor="rollno"
              className="block text-sm font-medium text-gray-700"
            >
              Roll No
            </label>
            <input
              onChange={handlechanges}
              type="text"
              id="rollno"
              name="RollNo"
              value={userdata.RollNo}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter roll number"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={updateData}
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none"
          >
            Update User
          </button>
        </div>
        <div className="text-green-500 text-center">{message}</div>
      </div>
    </div>
  );
};

export default EditUser;
