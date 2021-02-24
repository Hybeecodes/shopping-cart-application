import { BaseQueryDto } from '../../dtos/base.query.dto';

export interface IRepository<T> {
  findAll(query?: BaseQueryDto): Promise<T[]>;
  save(t: T): Promise<T>;
  update(t: T, id: number): Promise<boolean>;
}
