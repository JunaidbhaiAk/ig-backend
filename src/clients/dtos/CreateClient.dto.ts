import { IsString, IsEmail, IsInt } from 'class-validator';

export class CreatClientDto {
  @IsString()
  name: string;
  @IsString()
  address: string;
  @IsString()
  mob: string;
  @IsEmail()
  email: string;
  @IsInt()
  discount: number;
  @IsString()
  GSTNo: string;
}
