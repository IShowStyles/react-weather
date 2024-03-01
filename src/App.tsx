import { useState } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { protectedRoutes, publicRoutes } from './routes.tsx';

function App() {
  const [isLogin] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigate to={isLogin ? publicRoutes[0].path! : protectedRoutes[0].path!} replace />} />
        {isLogin
          ? protectedRoutes.map(({ path, element }, idx) => <Route element={element} path={path} key={idx} />)
          : publicRoutes.map(({ path, element }, idx) => <Route element={element} path={path} key={idx} />)}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
