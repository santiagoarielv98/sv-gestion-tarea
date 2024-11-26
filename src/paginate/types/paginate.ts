export interface PaginateOptions {
  page: number;
  limit: number;
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
