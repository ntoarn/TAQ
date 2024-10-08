export interface ICustomerInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
  payment: string;
  city: string;
}

export interface IOrderItem {
  _id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  _id: string;
  userId: string;
  items: IOrderItem[];
  totalPrice: number;
  customerInfo: ICustomerInfo;
  status: string;
  payment: string
}

  