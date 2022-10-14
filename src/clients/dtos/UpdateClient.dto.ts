import { IsString, IsEmail, IsInt, IsOptional } from 'class-validator';
export class UpdateClientDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  address: string;
  @IsString()
  @IsOptional()
  mob: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsInt()
  @IsOptional()
  discount: number;
}
