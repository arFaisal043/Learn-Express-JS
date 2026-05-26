// way 1:
// type UserRole = "admin" | "user"

// way 2:
enum UserRole {
  Admin = "admin",
  User = "user",
  Moderator = "moderator"
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  age: number;
  is_active?: boolean;
  role?: UserRole;
}
