import { useContext } from 'react';
import { DialogContext } from '../MainDialog';

export const useDialog = () => useContext(DialogContext);
