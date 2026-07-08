export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
