export type UserRole = "buyer" | "seller";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  favorites?: string[];
  orders?: string[]; // store orders based on itemId
}
