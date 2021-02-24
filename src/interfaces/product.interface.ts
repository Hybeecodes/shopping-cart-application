export interface IProduct {
  id?: number;
  name: string;
  sku: string;
  sellingPrice: number;
  stockLevel: number;
  expDate: Date;
  categoryId: number;
}
