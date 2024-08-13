import { createSelector } from "@reduxjs/toolkit";
import { api } from "./auth";

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  labels: Label[];
  priority: Priority;
  completed: boolean;
}

export type UpdateTask = Partial<Omit<Task, "_id">> & { _id: string };

export interface Label {
  _id: string;
  title: string;
}

export enum Priority {
  High = "high",
  Low = "low",
  Medium = "medium",
  Urgent = "urgent",
}

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    toggleTask: build.mutation<Task, string>({
      query: (id) => ({
        url: `/tasks/toggle/${id}`,
        method: "PATCH",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (draft) => {
            const task = draft.find((task) => task._id === id);
            if (task) {
              task.completed = !task.completed;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTask: build.mutation<Task, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const deleteResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (draft) => {
            const taskIndex = draft.findIndex((task) => task._id === id);
            if (taskIndex !== -1) {
              draft.splice(taskIndex, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          deleteResult.undo();
        }
      },
    }),
    updateTask: build.mutation<Task, UpdateTask>({
      query: ({ _id, ...task }) => ({
        url: `/tasks/${_id}`,
        method: "PUT",
        body: task,
      }),
      onQueryStarted: async (
        { _id, ...task },
        { dispatch, queryFulfilled }
      ) => {
        const updateResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (draft) => {
            const taskIndex = draft.findIndex(
              (task) => task._id === _id
            ) as number;
            if (taskIndex !== -1) {
              draft[taskIndex] = { ...draft[taskIndex], ...task };
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          updateResult.undo();
        }
      },
    }),
    createTask: build.mutation<Task, Omit<Task, "_id">>({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      onQueryStarted: async (task, { dispatch, queryFulfilled }) => {
        const addResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (draft) => {
            draft.push(task);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          addResult.undo();
        }
      },
    }),
    //label
    addLabel: build.mutation<Label, string>({
      query: (title) => ({
        url: "/labels",
        method: "POST",
        body: { title },
      }),
      onQueryStarted: async (title, { dispatch, queryFulfilled }) => {
        const addResult = dispatch(
          api.util.updateQueryData("getLabels", undefined, (draft) => {
            draft.push({ _id: "", title });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          addResult.undo();
        }
      },
    }),
  }),
});

const selectTasks = api.endpoints.getTasks.select();
const selectLabels = api.endpoints.getLabels.select();

export const selectTaskState = createSelector(selectTasks, (tasks) => tasks);

export const selectTodayTasks = createSelector(selectTasks, (tasks) => {
  const today = new Date();
  return (
    tasks.data?.filter(
      (task) =>
        !task.completed &&
        new Date(task.dueDate).toDateString() === today.toDateString()
    ) ?? []
  );
});

export const selectTomorrowTasks = createSelector(selectTasks, (tasks) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    tasks.data?.filter(
      (task) =>
        !task.completed &&
        new Date(task.dueDate).toDateString() === tomorrow.toDateString()
    ) ?? []
  );
});

export const selectOverdueTasks = createSelector(selectTasks, (tasks) => {
  const today = new Date();
  return tasks.data?.filter((task) => new Date(task.dueDate) < today) ?? [];
});

export const selectUpcomingTasks = createSelector(selectTasks, (tasks) => {
  const today = new Date();
  return (
    tasks.data?.filter(
      (task) => !task.completed && new Date(task.dueDate) > today
    ) ?? []
  );
});

export const selectCompletedTasks = createSelector(selectTasks, (tasks) => {
  return tasks.data?.filter((task) => task.completed) ?? [];
});

export const selectLabelState = createSelector(
  selectLabels,
  (labels) => labels
);

export const {
  useGetTasksQuery,
  useToggleTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useGetLabelsQuery,
  useAddLabelMutation,
  useCreateTaskMutation,
} = extendedApi;
