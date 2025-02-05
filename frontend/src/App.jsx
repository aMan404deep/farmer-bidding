import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Farmer_dashboard from './pages/Farmer_dashboard';
import Bidding from './component/Bidding';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Farmer_dashboard />} />
                <Route path="/bidding" element={<Bidding />} />
            </Routes>
        </Router>
    );
};

export default App;
