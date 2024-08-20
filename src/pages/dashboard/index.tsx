import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import useTask from '@/hooks/useTask';
import TasksTable from './TasksTable';
import MainCard from '@/components/MainCard';

export default function DashboardDefault() {
  const { openTask } = useTask();
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Tasks</Typography>
          </Grid>
          <Grid item>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }} onClick={() => openTask()}>
              Create Task
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <MainCard content={false}>
          <TasksTable />
        </MainCard>
      </Grid>
    </Grid>
  );
}
