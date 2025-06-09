'use client';

import React, {
  createContext,
  ReactNode, useLayoutEffect,
  useState
} from 'react';

type AuthProviderProps = {
  children?: ReactNode;
  isAuthenticated?: boolean
}

type IAuthContext = {
  isAuthenticated: boolean  | undefined
  setAuthenticated: (_newState?: boolean) => void
}

const initialValue = {
  isAuthenticated: undefined,
  setAuthenticated: (_newState?: boolean) => {}
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children, isAuthenticated }: AuthProviderProps) => {
  const [authenticated, setAuthenticated] = useState<boolean | undefined>(false);

  useLayoutEffect(() => {
    if (typeof isAuthenticated === 'boolean') {
      setAuthenticated(isAuthenticated);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export {  AuthContext, AuthProvider };
