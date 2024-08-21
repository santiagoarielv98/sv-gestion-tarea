import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { drawerClose, drawerCloseTransitionEnd, selectDrawerOpen, toggleDrawer } from '../layoutSlice';

function useLayout() {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectDrawerOpen);

  const handleDrawerToggle = () => {
    dispatch(toggleDrawer());
  };

  const handleDrawerClose = () => {
    dispatch(drawerClose());
  };

  const handleDrawerTransitionEnd = () => {
    dispatch(drawerCloseTransitionEnd());
  };

  return {
    open,
    handleDrawerToggle,
    handleDrawerClose,
    handleDrawerTransitionEnd
  };
}

export default useLayout;
