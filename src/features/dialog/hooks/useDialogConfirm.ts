import { useContext } from 'react';
import { DialogConfirmContext } from '../ConfirmDialog';

export const useDialogConfirm = () => useContext(DialogConfirmContext);
