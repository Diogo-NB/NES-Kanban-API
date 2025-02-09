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
import { TabService } from './tab.service';
import { CreateTabDto } from './dto/create-tab.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ReqUser } from '../users/user.decorator';
import { User } from '../users/entities/user.entity';
import { UpdateTabDto } from './dto/update-tab.dto';

@Controller('tab')
export class TabController {
  constructor(private readonly tabService: TabService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@ReqUser() user: User, @Body() dto: CreateTabDto) {
    return this.tabService.create(user.id, dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@ReqUser() user: User) {
    return this.tabService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@ReqUser() user: User, @Param('id') id: string) {
    return this.tabService.findOne(user.id, id.trim());
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@ReqUser() user: User, @Param('id') id: string) {
    return this.tabService.delete(user.id, id.trim());
  }

  @Patch()
  @UseGuards(AuthGuard)
  update(@ReqUser() user: User, @Body() dto: UpdateTabDto) {
    return this.tabService.update(user.id, dto);
  }
}
