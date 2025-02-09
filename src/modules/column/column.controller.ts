import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ReqUser } from '../users/user.decorator';
import { User } from '../users/entities/user.entity';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@ReqUser() user: User, @Body() dto: CreateColumnDto) {
    return this.columnService.create(user.id, dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@ReqUser() user: User) {
    return this.columnService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@ReqUser() user: User, @Param('id') id: string) {
    return this.columnService.findOne(user.id, id.trim());
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@ReqUser() user: User, @Param('id') id: string) {
    return this.columnService.delete(user.id, id.trim());
  }

  @Patch()
  @UseGuards(AuthGuard)
  update(@ReqUser() user: User, @Body() dto: UpdateColumnDto) {
    return this.columnService.update(user.id, dto);
  }
}
