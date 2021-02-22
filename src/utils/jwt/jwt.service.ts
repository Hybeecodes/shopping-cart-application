import * as jwt from 'jsonwebtoken';

export class JwtService {
  signPayload(payload: { [key: string]: any }): string {
    return jwt.sign(payload, 'SECRET_KEY', { expiresIn: '10h' });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, 'SECRET_KEY');
  }
}
