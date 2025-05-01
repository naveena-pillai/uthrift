export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: "buyer" | "seller";
  orders?: string[];
}
