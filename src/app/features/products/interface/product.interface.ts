export enum ProductCategory {
  FRUIT = 'Fruta',
  VEGETABLE = 'Vegetal',
  MEAT = 'Carne',
  DAIRY = 'Lácteos',
  BEVERAGE = 'Bebida',
  SNACK = 'Snack',
  OTHER = 'Otro'
}

export interface Product {
  name: string;
  category: ProductCategory;
  price: number;
  description?: string;
  photoUrl: string;
}
