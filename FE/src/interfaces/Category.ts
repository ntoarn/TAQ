export interface ICategory {
    _id?: string;
    name: string;
    slug: string;
    products?: IProduct[];
  }
export interface IProduct {
    _id?: string;
    title?: string;
    price?: number;
    description?: string;
    image?: string;
    quantity?: number;
    colorId?: string;  
    sizeId?: string; 
    categoryId?: string;
  }