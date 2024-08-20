import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import useTags from '@/hooks/useTags';
import TagOutlined from '@ant-design/icons/TagOutlined';

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
  }
];

export default function TagsTable() {
  const { tags, openTag } = useTags();
  const handleRowClick = (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, row: Tag) => {
    openTag(row);
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
            {tags.length === 0 && (
              <TableRow>
                <TableCell colSpan={headCells.length}>
                  <Typography variant="body1" color="textSecondary" align="center">
                    No tags found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {tags.map((row, index) => {
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
                    <Avatar>
                      <TagOutlined />
                    </Avatar>
                  </TableCell>
                  <TableCell onClick={(event) => handleRowClick(event, row)} sx={{ cursor: 'pointer' }}>
                    <Stack>
                      <Typography variant="subtitle1" sx={{ textDecoration: row.completed ? 'line-through' : 'none' }}>
                        {row.title}
                      </Typography>
                    </Stack>
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
