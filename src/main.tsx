import './App.css';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const container = document.getElementById('root')!;
if (!container) throw new Error('#root doesnt exist');
createRoot(container).render(<App />);
