import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div className=''>
      <div className=''>
        <a href={`${import.meta.env.VITE_API_URL}/auth/google`}>Sign in By Google</a>
      </div>
    </div>
  );
};

export { LoginPage };
