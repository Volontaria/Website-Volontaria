export interface ResponseApi<T> {
  count: number;
  next: any;
  previous: any;
  results: T[];
}
