import { AddProductToCartRequestDto } from '../../src/dtos/add-product-to-cart-request.dto';
import request from 'supertest';
import app from '../../src/app';
import * as HttpStatus from 'http-status';
import { ResponseStatus } from '../../src/interfaces/response.interface';
import { SuccessMessages } from '../../src/constants/success-messages.enum';
import { ErrorMessages } from '../../src/constants/error-messages.enum';
import { JwtService } from '../../src/utils/jwt/jwt.service';

describe('Cart Module', () => {
  let token: string;
  let jwtService: JwtService;
  beforeEach(() => {
    jwtService = new JwtService();
    // get token
    token = jwtService.signPayload({ email: 'paystackUser@mailinator.com' });
    console.log(token);
  });
  describe('Add Product to Cart', () => {
    it('should throw an error if product does not exist', async (done) => {
      const data: AddProductToCartRequestDto = {
        quantity: 2,
        productId: 0,
      };
      const res = await request(app)
        .post('/api/carts')
        .auth(token, { type: 'bearer' })
        .send(data)
        .set('Accept', 'application/json');
      expect.assertions(3);
      console.log(res.error);
      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBe(ErrorMessages.PRODUCT_NOT_FOUND);
      done();
    });

    it('should throw an error if productID is missing', async (done) => {
      const data = {
        quantity: 2,
      };
      const res = await request(app)
        .post('/api/carts')
        .auth(token, { type: 'bearer' })
        .send(data)
        .set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBeDefined();
      done();
    });

    it('should throw an error if quantity is invalid', async (done) => {
      const data: AddProductToCartRequestDto = {
        quantity: 100000,
        productId: 1,
      };
      const res = await request(app)
        .post('/api/carts')
        .auth(token, { type: 'bearer' })
        .send(data)
        .set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBe(ErrorMessages.INVALID_PRODUCT_QUANTITY);
      done();
    });

    it('should throw an error if authentication token is not sent', async (done) => {
      const data: AddProductToCartRequestDto = {
        quantity: 100000,
        productId: 1,
      };
      const res = await request(app).post('/api/carts').send(data).set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBe(ErrorMessages.NO_AUTH_ERROR);
      done();
    });

    it('should throw an error if authentication token is invalid', async (done) => {
      const data: AddProductToCartRequestDto = {
        quantity: 100000,
        productId: 1,
      };
      const invalidToken = '3333hfkhgkhgfkhjg';
      const res = await request(app)
        .post('/api/carts')
        .auth(invalidToken, { type: 'bearer' })
        .send(data)
        .set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBe(ErrorMessages.INVALID_AUTH_TOKEN_SUPPLIED);
      done();
    });

    it('should return success response if all is good', async (done) => {
      const data: AddProductToCartRequestDto = {
        quantity: 2,
        productId: 1,
      };
      const res = await request(app)
        .post('/api/carts')
        .auth(token, { type: 'bearer' })
        .send(data)
        .set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.CREATED);
      expect(res.body.status).toBe(ResponseStatus.SUCCESS);
      expect(res.body.message).toBe(SuccessMessages.ADD_TO_CART_SUCCESS);
      done();
    });
  });

  describe('Get User Cart', () => {
    it('should throw an error if authentication token is not sent', async (done) => {
      const res = await request(app).get('/api/carts').set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBe(ErrorMessages.NO_AUTH_ERROR);
      done();
    });

    it('should throw an error if authentication token is invalid', async (done) => {
      const invalidToken = '3333hfkhgkhgfkhjg';
      const res = await request(app)
        .get('/api/carts')
        .auth(invalidToken, { type: 'bearer' })
        .set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBe(ErrorMessages.INVALID_AUTH_TOKEN_SUPPLIED);
      done();
    });

    it('should return success response if all is good', async (done) => {
      const res = await request(app)
        .get('/api/carts')
        .auth(token, { type: 'bearer' })
        .set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.status).toBe(ResponseStatus.SUCCESS);
      expect(res.body.message).toBe(SuccessMessages.GET_CART_SUCCESS);
      done();
    });
  });

  describe('Remove Product From Cart', () => {
    const productId = 1;
    it('should throw an error if authentication token is not sent', async (done) => {
      const res = await request(app).delete(`/api/carts/products/${productId}`).set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBe(ErrorMessages.NO_AUTH_ERROR);
      done();
    });

    it('should throw an error if authentication token is invalid', async (done) => {
      const invalidToken = '3333hfkhgkhgfkhjg';
      const res = await request(app)
        .delete(`/api/carts/products/${productId}`)
        .auth(invalidToken, { type: 'bearer' })
        .set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBe(ErrorMessages.INVALID_AUTH_TOKEN_SUPPLIED);
      done();
    });

    it('should throw an error if product does not exist', async (done) => {
      const invalidProductId = 0;
      const res = await request(app)
        .delete(`/api/carts/products/${invalidProductId}`)
        .auth(token, { type: 'bearer' })
        .set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBe(ErrorMessages.PRODUCT_NOT_FOUND);
      done();
    });

    it('should return a success response if all is good', async (done) => {
      const res = await request(app)
        .delete(`/api/carts/products/${productId}`)
        .auth(token, { type: 'bearer' })
        .set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.status).toBe(ResponseStatus.SUCCESS);
      expect(res.body.message).toBe(SuccessMessages.REMOVE_PRODUCT_FROM_CART_SUCCESS);
      done();
    });
  });

  describe('Clear User Cart', () => {
    it('should throw an error if authentication token is not sent', async (done) => {
      const res = await request(app).delete(`/api/carts`).set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBe(ErrorMessages.NO_AUTH_ERROR);
      done();
    });

    it('should throw an error if authentication token is invalid', async (done) => {
      const invalidToken = '3333hfkhgkhgfkhjg';
      const res = await request(app)
        .delete(`/api/carts`)
        .auth(invalidToken, { type: 'bearer' })
        .set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBe(ErrorMessages.INVALID_AUTH_TOKEN_SUPPLIED);
      done();
    });

    it('should return a success response if all is good', async (done) => {
      const res = await request(app)
        .delete(`/api/carts`)
        .auth(token, { type: 'bearer' })
        .set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.status).toBe(ResponseStatus.SUCCESS);
      expect(res.body.message).toBe(SuccessMessages.CLEAR_CART_SUCCESS);
      done();
    });
  });
});
