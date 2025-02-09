import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateTabDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsPositive()
  order?: number;
}
