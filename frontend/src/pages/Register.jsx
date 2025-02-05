import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiMail, FiLock, FiPhone, FiUser } from "react-icons/fi";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
 
  return (
    <div className="px-4 py-12 bg-slate-900 min-h-screen grid place-content-center">
     
      <RegisterModal  />
    </div>
  );
};

const RegisterModal = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('farmer');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        phone,
        role
      });
      setMessage(response.data.message);
      if (response.data.success) {
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Registration failed');
    }
  };

  return (
    <AnimatePresence>
      { (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-8 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-4 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiUser />
              </div>
              <h3 className="text-3xl font-bold text-center mb-4">
                Create an Account
              </h3>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-indigo-600" />
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-white text-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>

                <div className="relative">
                  <FiMail className="absolute left-3 top-3 text-indigo-600" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-white text-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>

                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-indigo-600" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-white text-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>

                <div className="relative">
                  <FiPhone className="absolute left-3 top-3 text-indigo-600" />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-white text-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-white text-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="farmer">Farmer</option>
                  <option value="transporter">Transporter</option>
                </select>

                {message && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-white bg-white/10 p-2 rounded-lg"
                  >
                    {message}
                  </motion.p>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded-lg"
                  >
                    Register
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p className="text-white">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-amber-200 hover:underline"
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Register;