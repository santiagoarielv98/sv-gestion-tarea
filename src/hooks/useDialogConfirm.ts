import { DialogConfirmContext } from '@/contexts/dialog/confirm';
import { useContext } from 'react';

export const useDialogConfirm = () => useContext(DialogConfirmContext);
