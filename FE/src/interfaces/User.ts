export interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  phone?: string;
  avatar?: string;
  role?: "admin" | "member" | "guest";
  confirmPassword?: string;
  isLocked?: boolean; // Thêm thuộc tính để quản lý trạng thái khóa
}
