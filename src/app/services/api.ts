import { createSelector } from "@reduxjs/toolkit";
import { api } from "./auth";

export interface Tasks {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  labels: Label[];
  priority: Priority;
  isCompleted: boolean;
}

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
    getTasks: build.query<Tasks[], void>({
      query: () => "/tasks",
    }),
  }),
});

export const getTasksResult = extendedApi.endpoints.getTasks.select();

export const selectTasks = createSelector(getTasksResult, (result) => result);

export const { useGetTasksQuery } = extendedApi;
