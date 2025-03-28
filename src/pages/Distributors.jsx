import { useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";

const Distributors = () => {
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
console.log(distributors)
  return (
    <div className="pt-5">
      <p className="font-bold text-xl">Distributors</p>
      {/* table */}
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && distributors.length > 0 && (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">User Id</th>
              <th className="border border-gray-300 px-4 py-2">Full Name</th>
              <th className="border border-gray-300 px-4 py-2">Mobile Number</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Business Name</th>
              <th className="border border-gray-300 px-4 py-2">Entity Type</th>
              <th className="border border-gray-300 px-4 py-2">Account Status</th>
            </tr>
          </thead>
          <tbody>
            {distributors.map((record, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2 text-center">{record.user_id}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{record.full_name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{record.mobile_number}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{record.email}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {record.business_name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {record.entity_type}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {record.account_status=== 1 ? (
                    <span className="text-green-500 font-semibold">Success</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && distributors.length === 0 && <p>No records found.</p>}
    </div>
  );
};

export default Distributors;
