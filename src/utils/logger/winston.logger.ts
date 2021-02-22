import { transports, Logger, createLogger, LoggerOptions, format } from 'winston';
const { combine, timestamp, label, prettyPrint } = format;
import { ILogger } from './logger.interface';
import { configService } from '../config/config.service';

export class WinstonLogger implements ILogger {
  private readonly logConfig: LoggerOptions;
  public logger: Logger;
  constructor(scope: string) {
    const filePath = configService.get<string>('LOG_FILE_PATH');
    this.logConfig = {
      transports: [
        new transports.Console(),
        new transports.File({
          filename: filePath,
        }),
      ],
      format: combine(label({ label: scope }), timestamp(), prettyPrint()),
    };
    this.logger = createLogger(this.logConfig);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }
}
