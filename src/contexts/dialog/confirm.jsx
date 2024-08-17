import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

import { createContext, useContext } from 'react';

import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'open':
      return { ...state, ...action.payload, open: true };
    case 'close':
      return { ...state, open: false };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

const initialState = {
  open: false,
  title: 'Dialog Title',
  contentText: 'Dialog content text',
  cancelButton: { children: 'Cancel' },
  confirmButton: { children: 'Confirm' },
  onConfirm: () => Promise.resolve(),
  dialogProps: {
    fullWidth: true,
    maxWidth: 'xs'
  },
  subcomponentProps: {
    dialogTitleProps: {},
    dialogContentProps: {},
    dialogContentTextProps: {},
    dialogActionsProps: {}
  }
};

const DialogConfirmContext = createContext({
  openDialogConfirm: () => null,
  closeDialogConfirm: () => null
});

export const DialogConfirmProvider = ({ children }) => {
  const [value, dispatch] = useReducer(reducer, initialState);
  const {
    open,
    title,
    contentText,
    cancelButton,
    confirmButton,
    dialogProps = {},
    subcomponentProps: sp,
    onConfirm
  } = value;

  const openDialogConfirm = (options) => dispatch({ type: 'open', payload: options });
  const closeDialogConfirm = () => dispatch({ type: 'close' });
  const handleExited = () => dispatch({ type: 'reset' });

  return (
    <DialogConfirmContext.Provider value={{ openDialogConfirm, closeDialogConfirm }}>
      {children}
      <Dialog
        open={open}
        TransitionProps={{
          onExited: handleExited
        }}
        {...dialogProps}
        onClose={closeDialogConfirm}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await onConfirm();
            closeDialogConfirm();
          }}
        >
          <DialogTitle {...sp?.dialogTitleProps}>{title}</DialogTitle>
          <Divider />
          <DialogContent {...sp?.dialogContentProps}>
            {contentText && <DialogContentText {...sp?.dialogContentTextProps}>{contentText}</DialogContentText>}
          </DialogContent>
          <Divider />
          <DialogActions {...sp?.dialogActionsProps}>
            {cancelButton && 'component' in cancelButton ? (
              cancelButton.component
            ) : cancelButton ? (
              <Button onClick={closeDialogConfirm} color="primary" {...cancelButton.props}>
                {cancelButton.children}
              </Button>
            ) : null}
            {confirmButton && 'component' in confirmButton ? (
              confirmButton.component
            ) : confirmButton ? (
              <Button autoFocus type="submit" color="primary" variant="contained" {...confirmButton.props}>
                {confirmButton.children}
              </Button>
            ) : null}
          </DialogActions>
        </form>
      </Dialog>
    </DialogConfirmContext.Provider>
  );
};

export const useDialogConfirm = () => useContext(DialogConfirmContext);
