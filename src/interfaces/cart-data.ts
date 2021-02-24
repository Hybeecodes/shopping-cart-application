export class CartDataResponse {
  totalAmount: number = 0;
  items: CartItemResponse[] = [];
}

export class CartItemResponse {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  subTotal: number;
  sku: string;
}
