import { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState("");
  const [claimHistory, setClaimHistory] = useState([]);


  useEffect(() => {
    fetchCoupons();
    fetchClaimHistory();
  }, []);

  const fetchCoupons = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/v1/coupons`
    );
    setCoupons(response.data);
  };

  const fetchClaimHistory = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/v1/coupons/history`);
    setClaimHistory(response.data);
  };

  const unclaimCoupon = async (code) => {
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/v1/coupons/unclaim`, {
      code,
    });
    fetchCoupons();
  }

  const addCoupon = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/v1/coupons/add`, {
      code: newCoupon,
    });
    setNewCoupon("");
    fetchCoupons();
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newCoupon}
          onChange={(e) => setNewCoupon(e.target.value)}
          placeholder="Enter new coupon code"
          className="border p-2 mr-2"
        />
        <button
          onClick={addCoupon}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Add Coupon
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-2">Coupon List</h2>
      <ul className="w-full max-w-md">
        {coupons.map((coupon) => (
          <li
            key={coupon._id}
            className="border p-2 mb-2 bg-white shadow rounded"
          >
            {coupon.code} - {coupon.claimed ? "Claimed" : "Available"}
            <button
              onClick={() => unclaimCoupon(coupon.code)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Unclaim Coupon
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-4">User Claim History</h2>
      <ul className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        {claimHistory.length > 0 ? (
          claimHistory.map((entry, index) => (
            <li key={index} className="border-b p-3 flex justify-around items-center">
              <span className="font-medium">{entry.code}</span>
              <span className="text-gray-600">Claimed by: {entry.claimedBy}</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No claim history available</p>
        )}
      </ul>
    </div>
  );
}

export default AdminPanel;
