import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState('');

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/v1/coupons`);
    setCoupons(response.data);
  };

  const addCoupon = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/v1/coupons/add`, { code: newCoupon });
    setNewCoupon('');
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
        <button onClick={addCoupon} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Add Coupon
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-2">Coupon List</h2>
      <ul className="w-full max-w-md">
        {coupons.map((coupon) => (
          <li key={coupon._id} className="border p-2 mb-2 bg-white shadow rounded">
            {coupon.code} - {coupon.claimed ? 'Claimed' : 'Available'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;