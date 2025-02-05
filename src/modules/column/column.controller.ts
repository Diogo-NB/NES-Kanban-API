import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ReqUser } from '../users/user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateColumnDto, @ReqUser() user: User) {
    return this.columnService.create(user.id, dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@ReqUser() user: User) {
    return this.columnService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @ReqUser() user: User) {
    return this.columnService.findOne(user.id, id);
  }
}
