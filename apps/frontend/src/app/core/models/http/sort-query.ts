export interface SortQuery<T> {
  _sort?: keyof T;
  _order?: 'asc' | 'desc' | '';
}
