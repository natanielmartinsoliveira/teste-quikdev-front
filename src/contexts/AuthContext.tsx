import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User } from '../types';
import { useNavigate } from 'react-router-dom'; 


interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Omit<User, '_id'>) => Promise<void>;
  checkTokenValidity: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      checkTokenValidity();
      setUser(JSON.parse(loggedInUser));
    }

    // Adiciona um interceptor para respostas do Axios
    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    // Limpa o interceptor quando o componente é desmontado
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };

  }, []);

  const login = async (email: string, password?: string) => {
    const response = await axios.post('http://localhost:5000/auth/login', { email, password })
    .then(response => {
      if (response.data?.access_token?.length > 0) {
        const loggedInUser = response.data;
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));    
        checkTokenValidity(); // Verifique a validade do token após o login
        history('/');
      } else {
        throw new Error('Invalid email or password');
      }
    }).catch(() => {throw new Error('Invalid email or password')});
    
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    history('/');
  };

  const checkTokenValidity = async () => {
    const userData = localStorage.getItem('user'); // Obtém o access_token do localStorage
    if (!userData) {
      logout();
      return;
    }
    const user = JSON.parse(userData);
    const accessToken = user?.access_token;

    try {
      const response = await axios.get('http://localhost:5000/auth/validate-token', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.data.valid) {
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Token validation error:', error);
      logout();
    }
  };

  const register = async (userData: Omit<User, '_id' | 'name' | 'access_token'>) => { //
    await axios.post('http://localhost:5000/users/register', userData)
    .then((response)=>{
      if (response.data?.access_token?.length > 0) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setIsAuthenticated(true);
        checkTokenValidity(); // Verifique a validade do token após o login
        login(userData.email, userData.password);
      } else {
        throw new Error('Invalid email or password');
      }
    }).catch(()=>{ throw new Error('Invalid email or password') });

    
     
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register, checkTokenValidity }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };