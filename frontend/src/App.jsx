import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [coupon, setCoupon] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  

  const claimCoupon = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/v1/coupons/claim`);
      setCoupon(response.data.coupon);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error claiming coupon');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Claim Your Coupon</h1>
      {coupon ? (
        <p className="text-green-600 text-xl font-semibold border p-3 rounded bg-white shadow">
          Your Coupon: {coupon}
        </p>
      ) : (
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          onClick={claimCoupon}
          disabled={loading}
        >
          {loading ? 'Claiming...' : 'Claim Coupon'}
        </button>
      )}
      {message && <p className="mt-4 text-red-500 font-medium">{message}</p>}
      <button onClick={() => navigate('/admin')} className="mt-6 text-blue-600 underline">
        Go to Admin Panel
      </button>
    </div>
  );
}

export default App;