export interface OrderItem {
  itemId: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface UserOrder {
  orderId: string;
  total: number;
  items: OrderItem[];
}
