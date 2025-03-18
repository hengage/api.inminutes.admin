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

@Controller('errand')
@UseGuards(AuthGuard)
export class ErrandController {
  constructor(private readonly errandService: ErrandService) {}

  @Get('list')
  async getErrands(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
    @Query('reason') type: string = '',
    @Query('status') status: string = '',
  ) {
    return this.errandService.getErrands(
      page,
      limit,
      search,
      startDate,
      endDate,
      type,
      status,
    );
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
