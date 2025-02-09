import { IsNotEmpty, IsPositive, IsOptional, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsPositive()
  order: number = 0;
}
