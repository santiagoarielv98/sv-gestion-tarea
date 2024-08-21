import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import MainCard from '@/components/MainCard';
import useTags from '@/features/labels/hooks/useTags';
import TagsTable from '../components/TagsTable';

export default function TagsPage() {
  const { openTag } = useTags();
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Tags</Typography>
          </Grid>
          <Grid item>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }} onClick={() => openTag()}>
              Create Tag
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <MainCard content={false}>
          <TagsTable />
        </MainCard>
      </Grid>
    </Grid>
  );
}
