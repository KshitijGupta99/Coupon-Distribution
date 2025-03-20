import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === import.meta.env.VITE_ADMIN_USER && password === import.meta.env.VITE_ADMIN_PASS) {
      localStorage.setItem('admin-auth', 'true');
      setShowLogin(false);
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-indigo-500 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Claim Your Exclusive Coupon</h1>
      {coupon ? (
        <p className="text-lg font-semibold border p-4 rounded bg-white text-black shadow-lg">
          🎉 Your Coupon: {coupon}
        </p>
      ) : (
        <button
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
          onClick={claimCoupon}
          disabled={loading}
        >
          {loading ? 'Claiming...' : 'Claim Coupon'}
        </button>
      )}
      {message && <p className="mt-4 text-red-300 font-medium">{message}</p>}
      <button onClick={() => setShowLogin(true)} className="mt-6 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200">
        Admin Panel
      </button>
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black w-80">
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="flex justify-between">
              <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded-lg w-1/2 mr-2">Login</button>
              <button onClick={() => setShowLogin(false)} className="bg-gray-300 text-black px-4 py-2 rounded-lg w-1/2">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;