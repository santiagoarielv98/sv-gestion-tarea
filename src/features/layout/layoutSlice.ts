import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface LayoutState {
  drawerOpen: boolean;
  isClosing?: boolean;
}

const initialState: LayoutState = {
  drawerOpen: false,
  isClosing: false
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
    drawerClose: (state) => {
      state.isClosing = true;
      state.drawerOpen = false;
    },
    drawerCloseTransitionEnd: (state) => {
      state.isClosing = false;
    },
    toggleDrawer: (state) => {
      if (!state.isClosing) {
        state.drawerOpen = !state.drawerOpen;
      }
    }
  },
  selectors: {
    selectDrawerOpen: (state) => state.drawerOpen
  }
});

export const { setDrawerOpen, drawerClose, drawerCloseTransitionEnd, toggleDrawer } = layoutSlice.actions;

export const { selectDrawerOpen } = layoutSlice.selectors;

export default layoutSlice.reducer;
