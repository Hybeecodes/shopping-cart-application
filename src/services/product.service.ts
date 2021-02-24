import { IProductRepository } from '../repositories/interfaces/product.repository.interface';
import { IProduct } from '../interfaces/product.interface';
import { ILogger } from '../utils/logger/logger.interface';
import { ErrorMessages } from '../constants/error-messages.enum';
import HttpException from '../utils/exceptions/http.exception';
import * as HttpStatus from 'http-status';

export class ProductService {
  private readonly productRepository: IProductRepository;
  private readonly logger: ILogger;

  constructor(productRepository: IProductRepository, logger: ILogger) {
    this.productRepository = productRepository;
    this.logger = logger;
  }

  async getProductById(productId: number): Promise<IProduct> {
    let product: IProduct;
    try {
      product = await this.productRepository.getProductById(productId);
    } catch (e) {
      this.logger.error(`${ErrorMessages.GET_PRODUCT_BY_ID_FAILED}: ${e}`);
      throw new HttpException(ErrorMessages.GET_PRODUCT_BY_ID_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!product) {
      this.logger.error(`${ErrorMessages.PRODUCT_NOT_FOUND}`);
      throw new HttpException(ErrorMessages.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return product;
  }
}
