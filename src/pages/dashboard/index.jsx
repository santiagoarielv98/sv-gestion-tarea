// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from '@/components/MainCard';
import useTask from '@/hooks/useTask';
import TasksTable from './TasksTable';



export default function DashboardDefault() {
  // const { openDialogTask } = useTask();
  const { openTask } = useTask();
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
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
        <MainCard sx={{ mt: 2 }} content={false}>
          <TasksTable />
        </MainCard>
      </Grid>
    </Grid>
  );
}
