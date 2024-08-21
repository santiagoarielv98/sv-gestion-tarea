import type {
  ButtonProps,
  DialogActionsProps,
  DialogContentProps,
  DialogContentTextProps,
  DialogProps,
  DialogTitleProps
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import { createContext } from 'react';
import { useReducer } from 'react';

type ActionButtonOptions =
  | false
  | { children: string | React.ReactNode; props?: ButtonProps }
  | { component: React.ReactNode };

export type DialogOptions = Partial<{
  title: string | React.ReactNode;
  contentText: string | React.ReactNode;
  cancelButton: ActionButtonOptions;
  confirmButton: ActionButtonOptions;
  onConfirm: () => Promise<void>;
  dialogProps: Omit<DialogProps, 'open'>;
  slots: {
    dialogTitleProps?: DialogTitleProps;
    dialogContentProps?: DialogContentProps;
    dialogContentTextProps?: DialogContentTextProps;
    dialogActionsProps?: DialogActionsProps;
  };
}>;

type OpenDialogAction = {
  type: 'open';
  payload: DialogOptions;
};
type CloseDialogAction = { type: 'close' };
type ResetDialogAction = { type: 'reset' };
type Actions = OpenDialogAction | CloseDialogAction | ResetDialogAction;
type State = { open: boolean } & DialogOptions;

const reducer = (state: State, action: Actions): State => {
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

const initialState: State = {
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
  slots: {
    dialogTitleProps: {},
    dialogContentProps: {},
    dialogContentTextProps: {},
    dialogActionsProps: {}
  }
};
export type OpenDialog = (options: DialogOptions) => void;

type ContextType = {
  openDialogConfirm: (options: DialogOptions) => void;
  closeDialogConfirm: () => void;
};

export const DialogConfirmContext = createContext<ContextType>({
  openDialogConfirm: () => null,
  closeDialogConfirm: () => null
});

export const DialogConfirmProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, dispatch] = useReducer(reducer, initialState);
  const { open, title, contentText, cancelButton, confirmButton, dialogProps = {}, slots: sp, onConfirm } = value;

  const openDialogConfirm: OpenDialog = (options) => dispatch({ type: 'open', payload: options });
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
            await onConfirm?.();
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
