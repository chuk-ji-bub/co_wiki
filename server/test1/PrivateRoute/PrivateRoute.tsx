//PrivateRoute.tsx

import React, { ReactNode } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../UserContext/UserContext';

interface PrivateRouteProps {
  children: ReactNode;
  redirectTo?: string; // redirectTo 프로퍼티 추가
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, redirectTo = '/login' }) => {
  const { userName } = useUser();
  const location = useLocation();

  // 사용자가 로그인되어 있으면 자식 컴포넌트(children)를 렌더링하고, 그렇지 않으면 리디렉션 처리
  return userName ? (
    <>{children}</>
  ) : (
    <Navigate to={`${redirectTo}?returnUrl=${location.pathname}`} />
  );
};

export default PrivateRoute;
