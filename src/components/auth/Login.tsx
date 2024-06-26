import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-light border rounded">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;