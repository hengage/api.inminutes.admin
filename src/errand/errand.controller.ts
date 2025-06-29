import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AssignRiderDto, GetErrandsQueryDto } from './errand.dto';
import { ErrandService } from './errand.service';

@Controller('errands')
@UseGuards(AuthGuard)
export class ErrandController {
  constructor(private readonly errandService: ErrandService) {}

  @Get('')
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

  @Patch(':orderId/assign-rider')
  async assignToRider(
    @Param('orderId') orderId: string,
    @Body() assignRiderDto: AssignRiderDto,
  ) {
    return this.errandService.assignToRider(orderId, assignRiderDto.riderId);
  }
}
