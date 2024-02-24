import { useState } from 'react';
import './styles/App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { protectedRoutes, publicRoutes } from './routes.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [isLogin] = useState(false);

  return (
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_APP_CLIENT_ID}`}>
      <BrowserRouter>
        <Routes>
          <Route element={<Navigate to={isLogin ? publicRoutes[0].path! : protectedRoutes[0].path!} replace />} />
          {isLogin
            ? protectedRoutes.map(({ path, element }, idx) => <Route element={element} path={path} key={idx} />)
            : publicRoutes.map(({ path, element }, idx) => <Route element={element} path={path} key={idx} />)}
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
