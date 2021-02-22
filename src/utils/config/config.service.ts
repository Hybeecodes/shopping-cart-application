import { ConfigInterface } from './config.interface';
import dotenv from 'dotenv';

dotenv.config();

class ConfigService implements ConfigInterface {
  private readonly config: any;
  private static instance: ConfigService;

  constructor() {
    this.config = process.env;
  }

  get<T = any>(propertyPath: string): T | undefined {
    return this.config[propertyPath] as T;
  }

  static getInstance(): ConfigService {
    if (!this.instance) {
      this.instance = new ConfigService();
    }
    return this.instance;
  }
}

export const configService = ConfigService.getInstance(); // returns an instance
