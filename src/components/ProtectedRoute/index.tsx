import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthKey } from 'types/auth';
import { getAuthType } from 'utils';

interface Props {
  children: React.ReactNode;
  isProtected?: boolean;
}

const ProtectedRoute = ({ children, isProtected }: Props) => {
  const authType = getAuthType();

  if (!authType) {
    return <Navigate to="/" replace />;
  }

  if (authType === AuthKey.Client && isProtected) {
    return <Navigate to="/questionaire" replace />;
  }

  return children as JSX.Element;
};

export default ProtectedRoute;
