import * as redis from 'redis';
import { RedisClient } from 'redis';
import { configService } from '../config/config.service';

export class RedisService {
  private readonly client: RedisClient;

  constructor() {
    this.client = redis.createClient({
      url: configService.get<string>('REDIS_URL', 'redis://localhost:6379'),
    });
    this.client.on('error', function (error) {
      console.error(error);
    });
  }

  set(key: string, value: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.client.set(key, value);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

  get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) reject(err);
        resolve(value);
      });
    });
  }
}
