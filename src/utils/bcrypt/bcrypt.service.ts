import * as bcrypt from 'bcrypt';
export class BcryptService {
  hashPassword(password: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const hash = await bcrypt.hash(password, 10);
        resolve(hash);
      } catch (e) {
        reject(e);
      }
    });
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const isCorrect = await bcrypt.compare(password, hash);
        resolve(isCorrect);
      } catch (e) {
        reject(e);
      }
    });
  }
}
