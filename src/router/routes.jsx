import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import Dashboard from '../pages/Dashboard';
import BoardPage from '../pages/BoardPage';

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<Dashboard />} />
            <Route path="board/:boardId" element={<BoardPage />} />
        </Route>
        
    )
)