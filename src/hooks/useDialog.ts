import { DialogContext } from '@/contexts/dialog';
import { useContext } from 'react';

export const useDialog = () => useContext(DialogContext);
