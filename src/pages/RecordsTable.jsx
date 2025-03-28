import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecordsTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
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
        "http://test.sabbpe.com/api/v1/profile/zonalpaystatus",
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
      setTableData(data);
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
    setSelectedRecord(record);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
    setEmail(""); // Reset email field when closing
  };

  const handleCreateDistributor = async() => {
    // const token = localStorage.getItem("authToken");
    const userunder = localStorage.getItem("user_under")
    if (!userunder) {
      return;
    }
    if (!email) {
      alert("Please enter an email.");
      return;
    }
   const formDataToSend = new FormData()
   formDataToSend.append("uname",email)
   formDataToSend.append("usertype","Distributor")
   formDataToSend.append("ltype","email")
   formDataToSend.append("user_under",userunder)

   console.log(formDataToSend)
    try {
      const res = await fetch("http://test.sabbpe.com/api/v1/auth/createdistributor",{
        method:"POST",
        body: formDataToSend,
      })
      const result = await res.json();
      console.log(result)
      if (!res.ok) {
        throw new Error(result.message || "Failed to create distributor.");
      }
      alert("Distributor created successfully!");
      handleCloseModal();
      navigate("/distributors")
    } catch (error) {
      console.log(error)
    }

    console.log("Creating distributor for:", selectedRecord, "Email:", email);
    // Here you can send the email and selectedRecord data to your API

    // Close modal after action
    handleCloseModal();
  };

  return (
    <div className="pt-20 px-4">
      <p className="font-bold text-xl">Records Table</p>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && tableData.length > 0 && (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Bank Name</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">UTR No</th>
              <th className="border border-gray-300 px-4 py-2">Date Created</th>
              <th className="border border-gray-300 px-4 py-2">Payment Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((record, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2 text-center">{record.bank_name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">₹{record.amount.toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{record.utr_no}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {new Date(record.date_created).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {record.pay_status === 1 ? (
                    <span className="text-green-500 font-semibold">Success</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Pending</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {record.pay_status === 1 && (
                    <button
                      onClick={() => handleOpenModal(record)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Create Distributor
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && tableData.length === 0 && <p>No records found.</p>}

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create Distributor</h2>
            <p className="text-gray-700 mb-2">
              {/* Creating distributor for: <strong>{selectedRecord?.bank_name}</strong> */}
            </p>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateDistributor}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordsTable;
