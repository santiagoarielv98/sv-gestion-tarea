import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// icons @ant-design/icons

// third-party
// project import
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';

import useTask from '@/hooks/useTask';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'checkbox',
    align: 'left',
    disablePadding: true,
    label: ''
  },
  {
    id: 'task',
    align: 'left',
    disablePadding: false,
    label: 'Task'
  },
  {
    id: 'date',
    align: 'left',
    disablePadding: true,
    label: 'Date'
  }
];



function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TasksTable() {
  const { openTask, tasks, toggleTask, isLoadingToggle } = useTask();
  const order = 'asc';
  const orderBy = 'tracking_no';

  const handleRowClick = (event, row) => {
    openTask(row);
  };

  const handleCheckboxChange = async (event, row) => {
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
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(tasks, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1} key={row._id}>
                  <TableCell component="th" id={labelId} scope="row" padding="checkbox">
                    <Checkbox checked={row.completed} onClick={(event) => handleCheckboxChange(event, row)} />
                  </TableCell>
                  <TableCell onClick={(event) => handleRowClick(event, row)} sx={{ cursor: 'pointer' }}>
                    <Stack>
                      <Typography variant="subtitle1">{row.title}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {row.desc}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        {row.labels.map((label) => (
                          <Chip key={label._id} label={label.title} size="small" />
                        ))}
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

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };
