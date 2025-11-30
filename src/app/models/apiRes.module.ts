export interface ApiResponse<T> {
  message?: string;
  body?: T;
  data?: T;
  error?: any;
}