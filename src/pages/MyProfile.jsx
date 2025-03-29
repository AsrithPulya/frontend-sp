import { useScroll } from 'framer-motion';
import React, { useEffect, useState } from 'react'

const MyProfile = () => {
   const [myProfile,setProfile] = useState([])
   const [loading,setLoading] = useState(false)
   const [error,setError] = useState(null)
   const token = localStorage.getItem("authToken")
   const fetchDetails = async () => {
      if (!token) {
        return;
      }
      setLoading(true)
      setError(null)
      try {
        
        const response = await fetch(
          "http://test.sabbpe.com/api/v1/auth/fetchdistributor",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json(); // Parse the JSON response
        // console.log(data);
        setProfile(data)
        setLoading(false)
        setError(null)
      } catch (error) {
        console.log(error);
        setError("Something went wrong")
        setLoading(false)
      }
    };
  
    // console.log(userActive);
  
    useEffect(() => {
      fetchDetails();
    }, []);
   const userType = localStorage.getItem("usertype")


  return (
    <div className='pt-5 px-5'>
     <p className="font-bold text-xl">My profile</p>
     {!loading && !error &&  userType==="Distributor" && (
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
              <th className="border border-gray-300 px-4 py-2">
                Account Status
              </th>
            </tr>
          </thead>
          <tbody>
            {myProfile.map((record, index) => (
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
    </div>
  )
}

export default MyProfile
