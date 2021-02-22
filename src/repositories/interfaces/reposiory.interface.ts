import { BaseQueryDto } from '../../dtos/base.query.dto';

export interface IReposiory<T> {
  findAll(query?: BaseQueryDto): Promise<T[]>;
  save(t: T): Promise<T>;
  update(t: T, id: number): Promise<T>;
}
