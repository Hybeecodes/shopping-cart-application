import { Sequelize } from 'sequelize';
import { configService } from '../config/config.service';
import { DbDialectType } from './db-dialect.type';
import { WinstonLogger } from '../logger/winston.logger';
import { ILogger } from '../logger/logger.interface';

export class DatabaseService {
  readonly sequelize: Sequelize;
  private logger: ILogger;

  constructor(dialect: DbDialectType) {
    this.logger = new WinstonLogger('DatabaseService');
    this.sequelize = new Sequelize(
      configService.get<string>('DB_NAME'),
      configService.get<string>('DB_USER'),
      configService.get<string>('DB_PASS'),
      {
        host: configService.get<string>('DB_HOST'),
        dialect: dialect,
      }
    );
  }

  authenticate() {
    this.sequelize
      .authenticate()
      .then(() => {
        this.logger.info('DB Connection Successful');
      })
      .catch((err) => {
        this.logger.error(`DB Connection Error: ${err}`);
        process.exit(0);
      });
  }
}
