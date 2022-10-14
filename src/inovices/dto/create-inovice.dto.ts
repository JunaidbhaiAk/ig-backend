import { IsString, IsInt, IsArray } from 'class-validator';
import { ItemsType } from '../types/invoice.types';

export class CreateInoviceDto {
  @IsString()
  challanNo: string;
  @IsInt()
  transportaion: number;
  @IsArray()
  items: Array<ItemsType>;
}
