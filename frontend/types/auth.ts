export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface SignUpSuccessResponse {
  success: true;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface SignUpErrorResponse {
  success: false;
  message: string;
  user: null;
}

export type SignUpResponse = SignUpSuccessResponse | SignUpErrorResponse;
