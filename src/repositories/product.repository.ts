import { IProductRepository } from './interfaces/product.repository.interface';
import { BaseQueryDto } from '../dtos/base.query.dto';
import { IProduct } from '../interfaces/product.interface';
import { Product } from '../../db/models/product';

export class ProductRepository implements IProductRepository {
  getProductById(productId: number): Promise<IProduct> {
    return new Promise(async (resolve, reject) => {
      try {
        const product: any = await Product.findByPk(productId);
        resolve(product as IProduct);
      } catch (e) {
        reject(e);
      }
    });
  }
  findAll(query?: BaseQueryDto): Promise<IProduct[]> {
    return Promise.resolve([]);
  }

  save(t: IProduct): Promise<IProduct> {
    return Promise.resolve(undefined);
  }

  update(t: IProduct, id: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await Product.update({ ...t }, { where: { id, isDeleted: false } });
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }
}
