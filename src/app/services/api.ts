import { createSelector } from "@reduxjs/toolkit";
import { api } from "./auth";

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  labels: Label[];
  priority: Priority;
  isCompleted: boolean;
}

export type UpdateTask = Partial<Omit<Task, "_id">> & { _id: string };

export interface Label {
  _id: string;
  name: string;
  color: string;
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
        url: `/tasks/${id}`,
        method: "PATCH",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (draft) => {
            const task = draft.find((task) => task._id === id);
            if (task) {
              task.isCompleted = !task.isCompleted;
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
  }),
});

export const getTasksResult = extendedApi.endpoints.getTasks.select();

export const selectTasks = createSelector(getTasksResult, (result) => result);

export const {
  useGetTasksQuery,
  useToggleTaskMutation,
  useDeleteTaskMutation,
} = extendedApi;
