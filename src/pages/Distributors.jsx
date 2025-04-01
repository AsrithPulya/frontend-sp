import { useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const indianStates = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
const Distributors = () => {
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city,setCity] = useState("")
  const [isCreatingDistributor, setIsCreatingDistributor] = useState(false); // New loading state
  const navigate = useNavigate();



  console.log(state)
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "http://test.sabbpe.com/api/v1/profile/distributors",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setDistributors(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (record) => {
    // setSelectedRecord(record);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // setSelectedRecord(null);
    setEmail(""); // Reset email field when closing
  };

  const handleCreateDistributor = async () => {
    const userunder = localStorage.getItem("user_under");
    if (!userunder) return;

    if (!email) {
      alert("Please enter an email.");
      return;
    }

    setIsCreatingDistributor(true); // Set loading state

    const formDataToSend = new FormData();
    formDataToSend.append("uname", email);
    formDataToSend.append("usertype", "Distributor");
    formDataToSend.append("ltype", "email");
    formDataToSend.append("user_under", userunder);
    formDataToSend.append("user_state",state)
    formDataToSend.append("user_city",city)
    try {
      const res = await fetch(
        "http://test.sabbpe.com/api/v1/auth/createdistributor",
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create distributor.");
      }

      alert("Distributor created successfully!");
      handleCloseModal();
      // navigate("/distributors");
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreatingDistributor(false); // Reset loading state
    }
  };

  console.log(distributors)

  return (
    <div className="pt-5 px-5">
      <div className="flex justify-between px-5 py-5">
        <p className="font-bold text-xl">Distributors</p>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
        >
          Create Distributor
        </button>
      </div>

      {/* table */}
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && distributors.length > 0 && (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">User Id</th>
              <th className="border border-gray-300 px-4 py-2">Full Name</th>
              {/* <th className="border border-gray-300 px-4 py-2">Mobile Number</th> */}
              {/* <th className="border border-gray-300 px-4 py-2">Email</th> */}
              <th className="border border-gray-300 px-4 py-2">
                Business Name
              </th>
              <th className="border border-gray-300 px-4 py-2">Entity Type</th>
              <th className="border border-gray-300 px-4 py-2">State</th>
              <th className="border border-gray-300 px-4 py-2">City</th>

              <th className="border border-gray-300 px-4 py-2">
                Account Status
              </th>
            </tr>
          </thead>
          <tbody>
            {distributors.map((record, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {record.user_id}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {record.full_name}
                </td>
                {/* <td className="border border-gray-300 px-4 py-2 text-center">{record.mobile_number}</td> */}
                {/* <td className="border border-gray-300 px-4 py-2 text-center">{record.email}</td> */}
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {record.business_name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {record.entity_type}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {record.user_state}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {record.user_city === "" ? "-" : record.user_city}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {record.account_status === 1 ? (
                    <span className="text-green-500 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-500 font-semibold">
                      Processing
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && distributors.length === 0 && (
        <p>No records found.</p>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create Distributor</h2>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-4"
              required
            />
            <div>
            <select
              id="state"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 text-base border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:shadow-md"
              required
            >
              <option value="" disabled>
                Select a state
              </option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mt-4"
              
            />
            </div>
           
            <div className="flex justify-end space-x-2 mt-5">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
                disabled={isCreatingDistributor }
              >
                Cancel
              </button>
              <button
                onClick={handleCreateDistributor}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded flex items-center justify-center"
                disabled={isCreatingDistributor || email==="" || state === ""}
              >
                {isCreatingDistributor ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="white"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Distributors;
