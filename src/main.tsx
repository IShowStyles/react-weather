import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';

const container = document.getElementById('root')!;
if (!container) throw new Error('#root doesnt exis1t');
createRoot(container).render(<App />);
