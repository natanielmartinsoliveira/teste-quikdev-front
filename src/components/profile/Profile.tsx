import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get<User>(`http://localhost:5000/users/${user._id}`);
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await axios.put(`http://localhost:5000/users/${user._id}`, {  email, name });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleUpdate} className="p-4 bg-light border rounded">
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Name:</label>
            <input
              type="text"
              value={name}
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
      <br/>
      <button onClick={logout} className="btn btn-danger">Logout</button>
    </div>
  );
};

export default Profile;