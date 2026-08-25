'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  skills: string[];
  interests: string[];
  preferredLevel: string;
  avatar: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  profile: UserProfile;
  isGuest?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, token: string, user: User) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Synchronize local session storage
    const storedToken = localStorage.getItem('nextgen_token');
    const storedUser = localStorage.getItem('nextgen_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        // Safe clear if parsing fails
        localStorage.removeItem('nextgen_token');
        localStorage.removeItem('nextgen_user');
      }
    } else {
      // Automatic Guest Account setup
      const guestUser: User = {
        id: 'guest_user',
        username: 'Guest Explorer',
        email: 'guest@nextgenprojector.ai',
        isGuest: true,
        profile: {
          skills: ['React', 'JavaScript'],
          interests: ['AI', 'Web Applications'],
          preferredLevel: 'Beginner',
          avatar: ''
        }
      };
      setUser(guestUser);
      setToken('guest_token');
    }
    setLoading(false);
  }, []);

  const login = (email: string, tokenVal: string, userVal: User) => {
    setToken(tokenVal);
    setUser(userVal);
    localStorage.setItem('nextgen_token', tokenVal);
    localStorage.setItem('nextgen_user', JSON.stringify(userVal));
  };

  const logout = () => {
    setToken('guest_token');
    const guestUser: User = {
      id: 'guest_user',
      username: 'Guest Explorer',
      email: 'guest@nextgenprojector.ai',
      isGuest: true,
      profile: {
        skills: ['React', 'JavaScript'],
        interests: ['AI', 'Web Applications'],
        preferredLevel: 'Beginner',
        avatar: ''
      }
    };
    setUser(guestUser);
    localStorage.removeItem('nextgen_token');
    localStorage.removeItem('nextgen_user');
    localStorage.removeItem('nextgen_saved_local');
  };

  const updateProfile = (profileUpdate: Partial<UserProfile>) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        ...profileUpdate
      }
    };
    setUser(updatedUser);
    if (!user.isGuest) {
      localStorage.setItem('nextgen_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
