import { RouterProvider } from 'react-router-dom';

// project import
import router from '@/routes';
import ThemeCustomization from '@/themes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import ScrollTop from '@/components/ScrollTop';

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeCustomization>
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
      </ThemeCustomization>
    </LocalizationProvider>
  );
}
