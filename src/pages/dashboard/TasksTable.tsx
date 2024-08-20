import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';

import useTask from '@/hooks/useTask';
import type { Task } from '@/features/tasks/types/task';

const headCells = [
  {
    id: 'checkbox',
    align: 'left' as const,
    disablePadding: true,
    label: ''
  },
  {
    id: 'task',
    align: 'left' as const,
    disablePadding: false,
    label: 'Task'
  },
  {
    id: 'date',
    align: 'left' as const,
    disablePadding: true,
    label: 'Date'
  }
];

export default function TasksTable() {
  const { openTask, tasks, toggleTask, isLoadingToggle } = useTask();

  const handleRowClick = (_event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, row: Task) => {
    openTask(row);
  };

  const handleCheckboxChange = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: Task) => {
    event.stopPropagation();
    if (isLoadingToggle) return;
    await toggleTask(row._id);
  };

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.align}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              // Empty row
              tasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={headCells.length}>
                    <Typography variant="body1" color="textSecondary" align="center">
                      No tasks found
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            }
            {tasks.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row._id}
                >
                  <TableCell component="th" id={labelId} scope="row" padding="checkbox">
                    <Checkbox
                      id={labelId}
                      checked={row.completed}
                      onClick={(event) => handleCheckboxChange(event, row)}
                    />
                  </TableCell>
                  <TableCell onClick={(event) => handleRowClick(event, row)} sx={{ cursor: 'pointer' }}>
                    <Stack>
                      <Typography variant="subtitle1" sx={{ textDecoration: row.completed ? 'line-through' : 'none' }}>
                        {row.title}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {row.desc}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        {row.tags?.map((label) => <Chip key={label._id} label={label.title} size="small" />)}
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell width={100} onClick={(event) => handleRowClick(event, row)} sx={{ cursor: 'pointer' }}>
                    {new Date(row.dueDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
