export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: "buyer" | "seller";
  favorites?: string[];
  orders?: string[]; // store orders based on itemId
}
