import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TabIconEnum } from '../entities/tab-icon-enum';

export class CreateTabDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  order: number = 0;

  @IsOptional()
  @IsEnum(TabIconEnum)
  icon: TabIconEnum = TabIconEnum.SAVE_FILE;
}
