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
  ValidationPipe,
} from '@nestjs/common';
import { RiderService } from './rider.service';
import { CreateRiderDto, GetDeliveriesQueryDto, GetRidersQueryDto, GetWorkAreasQueryDto, UpdateRiderDto } from './rider.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { query } from 'express';

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
    @Query(ValidationPipe) query: GetRidersQueryDto
  ) {
    return this.riderService.getRiders(query)
  }

  @Get('/:rider/deliveries')
  async getRiderDeliveries(
    @Param('rider') rider: string,
    @Query(ValidationPipe) query: GetDeliveriesQueryDto
  ) {
    return this.riderService.getRiderDeliveries(
      rider,
      query
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
    @Query(ValidationPipe) query: GetWorkAreasQueryDto
  ) {
    return this.riderService.getWorkAreas(query);
  }

  @Get('/work-area/:workAreaId/session/list')
  async getWorkAreaSession(
    @Param('workAreaId') workAreaId: string,
    @Query(ValidationPipe) query: GetWorkAreasQueryDto
  ) {
    return this.riderService.getWorkAreaSession(workAreaId, query);
  }
  @Get('/work-area/:workAreaId/session/:sessionId/rider-list')
  async getBookedRidersPerSession(
    @Param('workAreaId') workAreaId: string,
    @Param('sessionId') sessionId: string,
    @Query(ValidationPipe) query: GetWorkAreasQueryDto
  ) {
    return this.riderService.getBookedRidersPerSession(
      workAreaId,
      sessionId,
      query
    );
  }
  @Delete(':riderId')
  async delete(@Param('riderId') riderId: string) {
    return this.riderService.delete(riderId);
  }
}
