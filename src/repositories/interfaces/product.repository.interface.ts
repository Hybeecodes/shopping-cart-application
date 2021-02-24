import { IRepository } from './repository.interface';
import { IProduct } from '../../interfaces/product.interface';

export interface IProductRepository extends IRepository<IProduct> {
  getProductById(productId: number): Promise<IProduct>;
}
