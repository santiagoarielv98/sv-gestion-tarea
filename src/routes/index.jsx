import { createBrowserRouter } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

const router = createBrowserRouter([LoginRoutes, MainRoutes]);

export default router;
