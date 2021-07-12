import { createContext } from 'react';

export const AuthenticationContext = createContext({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {}
});


