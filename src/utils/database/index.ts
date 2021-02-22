import { DatabaseService } from './database.service';
import { DbDialectType } from './db-dialect.type';

export const databaseService = new DatabaseService(<DbDialectType>'mysql');
