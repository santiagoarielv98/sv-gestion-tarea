import type { SortingState } from "@tanstack/react-table";

export interface PaginateOptions {
  page: number;
  limit: number;
  q?: string;
  sorting: SortingState;
}

export interface MetaPaginate {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface Paginate<T> {
  data: T[];
  meta: MetaPaginate;
}
