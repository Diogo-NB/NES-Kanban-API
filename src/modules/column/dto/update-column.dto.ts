import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateColumnDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsPositive()
  order?: number;
}
