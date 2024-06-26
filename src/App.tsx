import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PostList from './components/posts/PostList';
import PostForm from './components/posts/PostForm';
import Report from './components/report/Report';
import Profile from './components/profile/Profile';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
        <Header />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/new" element={<PostForm />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/report" element={<Report />} />
              <Route path="/edit-post/:postId" element={<PostForm />} />

            </Routes>
          </div>
        <Footer />
    </AuthProvider>
    
  );
};

export default App;


