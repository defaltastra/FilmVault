// Import necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const updatePassword = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            const userName = localStorage.getItem('userName');
    
            const response = await axios.post('http://127.0.0.1:8000/update-password', {
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: confirmPassword,
            }, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'X-User-Name': userName, 
                }
            });
    
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };
    
      

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Update Password</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button onClick={updatePassword} className="bg-cyan-600 text-white py-2 px-4 rounded-md">
          Update Password
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Settings;
