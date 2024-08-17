import { createBrowserRouter } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';



const router = createBrowserRouter([MainRoutes, LoginRoutes]);

export default router;
