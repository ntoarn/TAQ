export interface Product {
    _id?: string;
    title: string;
    price: number;
    description: string;
    image: string;
    color?: string;
    categoryId?: Category;
}
export interface Category{
    _id?: string;
    name:string;
    slug:string
}