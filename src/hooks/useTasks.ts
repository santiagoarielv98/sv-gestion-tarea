import {
  selectOverdueTasks,
  selectTodayTasks,
  selectTomorrowTasks,
  selectUpcomingTasks,
  selectCompletedTasks,
  useGetTasksQuery,
} from "@/app/services/api";
import { useAppSelector } from "./store";

function useTasks() {
  const { ...rest } = useGetTasksQuery();

  const todayTasks = useAppSelector(selectTodayTasks);
  const tomorrowTasks = useAppSelector(selectTomorrowTasks);
  const overdueTasks = useAppSelector(selectOverdueTasks);
  const upcomingTasks = useAppSelector(selectUpcomingTasks);
  const completedTasks = useAppSelector(selectCompletedTasks);

  return {
    todayTasks,
    tomorrowTasks,
    overdueTasks,
    completedTasks,
    upcomingTasks,
    ...rest,
  };
}

export default useTasks;
