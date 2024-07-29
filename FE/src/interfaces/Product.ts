export interface Product {
    _id?: string;
    title?: string;
    price?: number;
    description?: string;
    image?: string;
    quantity?: number;
    colorId?: Color;  
    sizeId?: Size; 
    categoryId?: Category;
  }
  
export interface Category{
    _id?: string;
    name:string;
    slug:string
}
export interface Color {
  _id?: string;
  color: string;
}
export interface Size {
  _id?: string;
  size: string;
}
