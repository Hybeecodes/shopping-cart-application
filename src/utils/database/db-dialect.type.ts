enum DBTypes {
  MYSQL = 'mysql',
  POSTGRES = 'postgres',
}

export type DbDialectType = DBTypes.MYSQL | DBTypes.POSTGRES;
