import { useState, useEffect, useCallback, createContext } from 'react';

let logoutTimer;

const AuthContext = createContext({
  token: '',
  login: () => {},
  logout: () => {},
  userId: null
});

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime();
  const expTime = exp;
  const remainingTime = expTime - currentTime;
  return remainingTime;
};

const getLocalData = () => {
  const storedToken = localStorage.getItem('token');
  const storedExp = localStorage.getItem('expireTime');

  const remainingTime = calculateRemainingTime(storedExp);

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem('token');
    localStorage.removeItem('expireTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime
  };
};

export const AuthContextProvider = (props) => {
  const localData = getLocalData();

  let initialToken;
  if (localData) {
    initialToken = localData.token;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(null);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expireTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const login = (token, expireTime, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem('token', token);
    localStorage.setItem('expireTime', expireTime);

    let remainingTime = calculateRemainingTime(expireTime);

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    
    logoutTimer = setTimeout(logout, remainingTime);
  };

  const contextValue = {
    token,
    login,
    logout,
    userId
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;