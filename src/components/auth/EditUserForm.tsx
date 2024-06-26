import React, { useState } from 'react';
import axios from '../../axiosInstance';
import { useAuth } from '../../hooks/useAuth';

const EditUserForm: React.FC = () => {
  const { user, login } = useAuth();
  const [name, nameUrl] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/users', { name, email }, {
        headers: { Authorization: `Bearer ${user?.access_token}` }
      });
      //login(response.data);
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Profile</h1>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => nameUrl(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditUserForm;
