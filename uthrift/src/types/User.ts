import { UserOrder } from "./Order";

export interface User {
  uid: string;
  name: string;
  email: string;
  role: "buyer" | "seller";
  favorites?: string[];
  orders?: UserOrder[];
}
