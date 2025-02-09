import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { TabIconEnum } from '../entities/tab-icon-enum';

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

  @IsOptional()
  @IsEnum(TabIconEnum)
  icon?: TabIconEnum;
}
