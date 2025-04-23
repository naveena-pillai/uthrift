import { UserOrder } from "./Order";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: "buyer" | "seller";
  favorites?: string[];
  orders?: UserOrder[];
}
