export interface IOrderItem {
    name: string; 
    price: number;
    quantity: number;
}

export interface ICustomerInfo {
    name: string;
    email: string;
    address: string;
    phone: number;
    payment: string;
    city: string;
}

export interface IOrder {
    userId: string;
    items: IOrderItem[];
    orderNumber: string;
    customerInfo: ICustomerInfo;
    totalPrice: number;
    status?: "pending" | "confirmed" | "shipped" | "delivered";
}