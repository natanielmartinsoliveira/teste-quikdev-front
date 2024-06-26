import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser : any = { email, password, name };
    try {
      await register(newUser);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-light border rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="name"
          placeholder="Name"
          value={name}
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
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
        />
      </div>
      
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default Register;