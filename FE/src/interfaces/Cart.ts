export interface ICart {
  _id: string;
  userId: string;
  products: {
    _id: string;
    productId: string
    quantity: number;
  }[];
}
