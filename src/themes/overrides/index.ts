import merge from 'lodash/merge';

import type { Theme } from '@mui/material/styles';

// import Badge from './Badge';
import Button from './Button';
import CardContent from './CardContent';
import Checkbox from './Checkbox';
import Chip from './Chip';
import IconButton from './IconButton';
import InputLabel from './InputLabel';
import LinearProgress from './LinearProgress';
// import Link from './Link';
import ListItemIcon from './ListItemIcon';
import OutlinedInput from './OutlinedInput';
import TableCell from './TableCell';
import Typography from './Typography';

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    Button(theme),
    // Badge(theme),
    CardContent(),
    Checkbox(theme),
    Chip(theme),
    IconButton(theme),
    InputLabel(theme),
    LinearProgress(),
    // Link(),
    ListItemIcon(),
    OutlinedInput(theme),
    TableCell(theme),
    Typography()
  );
}
