export type UserType = {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export type LoginResponse = {
  token: string;
  user: UserType;
};


export interface RegisterResponse {
  success: boolean;
  msg: string;
  user?: any;
}

export type AuthContextType = {
  user: UserType | null;
  login: (email: string, password: string) => Promise<{ success: boolean; msg?: string }>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) => Promise<{ success: boolean; msg?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; msg?: string }>;
  logout: () => Promise<void>;
};
