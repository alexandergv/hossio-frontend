// src/services/authService.js

let isAuthenticated: boolean = false;

export const setAuthStatus = (status: boolean): void => {
  isAuthenticated = status;
};

export const getAuthStatus= (): boolean => {
  return isAuthenticated;
};

export const clearAuthStatus = (): void => {
  isAuthenticated = false;
};
