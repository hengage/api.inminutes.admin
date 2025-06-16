import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  BadRequestException,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ErrandService } from './errand.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetErrandsQueryDto } from './errand.dto';

@Controller('errand')
@UseGuards(AuthGuard)
export class ErrandController {
  constructor(private readonly errandService: ErrandService) {}

  @Get('list')
  async getErrands(@Query() query: GetErrandsQueryDto) {
    return this.errandService.getErrands(query);
  }

  @Get(':errandId')
  async getErrandDetails(@Param('errandId') errandId: string) {
    return this.errandService.getErrandDetails(errandId);
  }

  @Put(':errandId/status')
  async updateErrandStatus(
    @Param('errandId') errandId: string,
    @Body('status') status: string,
  ) {
    return this.errandService.changeErrandStatus(errandId, status);
  }

  @Delete(':errandId')
  async delete(@Param('errandId') errandId: string) {
    return this.errandService.delete(errandId);
  }
}
