export interface User {
  email?: string;
  password?: string;
  confirmPass?: string;
  _id?: string;
}

export interface UserData {
  user: User;
}