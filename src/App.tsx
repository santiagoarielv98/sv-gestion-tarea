import { RouterProvider } from 'react-router-dom';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import ScrollTop from '@/components/ScrollTop';
import router from '@/routes';
import ThemeCustomization from '@/themes';

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
