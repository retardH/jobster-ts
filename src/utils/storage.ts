import { User } from '../types';

export const addUserToLocalStorage = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

export const getUserFromLocalStorage = (): User | null => {
  const data = localStorage.getItem('user');
  return data ? JSON.parse(data) : null;
};
