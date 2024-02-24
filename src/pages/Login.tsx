import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin } from 'react-google-login';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    clientId: import.meta.env.VITE__CLIENT_ID,
    onSuccess: (tokenResponse: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      console.log(tokenResponse.code);
      alert('123 loggined');
      navigate('/');
    },
    onFailure: (errorResponse: any) => console.log(errorResponse),
  });
  return (
    <div className=''>
      <div className=''>
        <button
          onClick={() => {
            login.signIn();
          }}
        >
          Sign in
        </button>
        <p>{import.meta.env}</p>
      </div>
    </div>
  );
};

export { LoginPage };
