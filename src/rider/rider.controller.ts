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
import { RiderService } from './rider.service';
import { CreateRiderDto, GetDeliveriesQueryDto, GetRidersQueryDto, GetWorkAreaSessionQueryDto, GetWorkAreasQueryDto, RiderParamDto, UpdateRiderDto } from './rider.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('rider')
@UseGuards(AuthGuard)
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  @Post('register')
  async createRider(@Body() createRiderDto: CreateRiderDto) {
    return this.riderService.createRider(createRiderDto);
  }

  @Put('update/:riderId')
  async updateRider(
    @Param('riderId') riderId: string,
    @Body() updateRiderDto: UpdateRiderDto,
  ) {
    return this.riderService.updateRider(updateRiderDto, riderId);
  }

  @Get('list')
  async getRiders(
    @Query() query: GetRidersQueryDto
  ) {
    return this.riderService.getRiders(
      query
    );
  }

  @Get('/:rider/deliveries')
  async getRiderDeliveries(
    @Param() { riderId }: RiderParamDto,
    @Query() query: GetDeliveriesQueryDto,
  ) {
    return this.riderService.getRiderDeliveries(
      riderId, query
    );
  }

  @Get(':riderId')
  async getRiderDetails(@Param('riderId') riderId: string) {
    return this.riderService.getRiderDetails(riderId);
  }

  @Get(':riderId')
  async getRiderWalletDetails(@Param('riderId') riderId: string) {
    return this.riderService.getRiderWalletDetails(riderId);
  }

  @Put(':riderId/approval')
  async approveOrDisapprove(
    @Param('riderId') riderId: string,
    @Body('approve') approve: boolean,
  ) {
    return this.riderService.approveOrDisapprove(riderId, approve);
  }

  @Get('/work-areas/list')
  async getWorkAreas(
    @Query() query: GetWorkAreasQueryDto,
  ) {
    return this.riderService.getWorkAreas(query);
  }

  @Get('/work-area/:workAreaId/session/list')
  async getWorkAreaSession(
    @Param('workAreaId') workAreaId: string,
    @Query() query: GetWorkAreaSessionQueryDto,
  ) {
    return this.riderService.getWorkAreaSession(workAreaId, query);
  }
  @Get('/work-area/:workAreaId/session/:sessionId/rider-list')
  async getBookedRidersPerSession(
    @Param('workAreaId') workAreaId: string,
    @Param('sessionId') sessionId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.riderService.getBookedRidersPerSession(
      workAreaId,
      sessionId,
      page,
      limit,
    );
  }
  @Delete(':riderId')
  async delete(@Param('riderId') riderId: string) {
    return this.riderService.delete(riderId);
  }

  @Get('/top-riders')
  async getTopRiders(
    @Query() query: GetWorkAreasQueryDto
  ) {
    return this.riderService.getTopRiders(query);
  }

  @Get('/rider-summary')
  async getRiderSummary() {
    return this.riderService.getRiderSummary();
  }
  @Get('/rider-metrics')
  async getRiderMetrics() {
    return this.riderService.getRiderMetrics();
  }
}
