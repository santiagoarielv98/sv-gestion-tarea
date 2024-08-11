import { useGetTasksQuery } from "@/app/services/api";

function useTasks() {
  const { data: tasks = [], ...rest } = useGetTasksQuery();

  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayTasks = tasks?.filter(
    (task) =>
      // !task.isCompleted &&
      new Date(task.dueDate).toDateString() === today.toDateString()
  );

  const tomorrowTasks = tasks?.filter(
    (task) =>
      // !task.isCompleted &&
      new Date(task.dueDate).toDateString() === tomorrow.toDateString()
  );

  const overdueTasks = tasks?.filter((task) => {
    const taskDate = new Date(task.dueDate);
    return taskDate < today;
  });

  const completedTasks = tasks?.filter((task) => task.isCompleted);

  return {
    todayTasks,
    tomorrowTasks,
    overdueTasks,
    completedTasks,
    ...rest,
  };
}

export default useTasks;
