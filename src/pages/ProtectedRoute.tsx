import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store.ts';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  return <>{user ? children : <Navigate to="/register" replace />}</>;
};

export default ProtectedRoute;
