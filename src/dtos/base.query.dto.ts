import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum SortOrder {
  DESC = 'DESC',
  ASC = 'ASC',
}

export enum SortFields {
  VOTES = 'upvotes',
  CREATED_DATE = 'createdDate',
  UPDATED_DATE = 'updatedDate',
}
export class BaseQueryDto {
  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsNumber()
  offset: number;

  @IsOptional()
  @IsEnum(SortFields)
  sortBy: string;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder: string;
}
