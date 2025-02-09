import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTabDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  order: number = 0;
}
