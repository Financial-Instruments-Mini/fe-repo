import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLogInState } from '../data/atoms';
import { userInfoState } from './../data/atoms';
import { postRefreshToken } from './../api/api';

interface IProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const [isLogIn, setIsLogIn] = useRecoilState(isLogInState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [token, setToken] = useCookies();

  // console.log(isLogIn, userInfo, token.accessToken);

  useEffect(() => {
    if (!token.accessToken && token.refreshToken) {
      postRefreshToken(token.refreshToken).then(res => {
        console.log('hello', token.refreshToken);
        setToken('accessToken', res.data.accessToken, { maxAge: 60 * 30 });
        setToken('refreshToken', res.data.refreshToken, { maxAge: 60 * 60 * 24 * 14 });
      });
    }
  }, []);

  if (isLogIn && !token.accessToken && !token.refreshToken) {
    setIsLogIn(false);
    setUserInfo({
      email: '',
      phoneNumber: '',
      name: '',
      birthday: '',
      productType: '',
      job: '',
      bankName: '',
    });
    alert('토큰이 만료되어 로그인 페이지로 이동합니다.');
    return <Navigate to='/login' />;
  } else if (!isLogIn && !token.accessToken && !token.refreshToken) {
    alert('회원가입이나 로그인을 먼저 해주세요.');
    return <Navigate to='/login' />;
  }
  return token.accessToken && children;
};

export default ProtectedRoute;
