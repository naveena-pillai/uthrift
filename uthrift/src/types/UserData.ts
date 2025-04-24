import { UserOrder } from "./Order";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: "buyer" | "seller";
  favorites?: string[];
  orders?: UserOrder[];
}
