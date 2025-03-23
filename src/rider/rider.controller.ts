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
import {
  AddWorkAreaDto,
  CreateRiderDto,
  GetDeliveriesQueryDto,
  GetRidersQueryDto,
  GetWorkAreasQueryDto,
  UpdateRiderDto,
} from './rider.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { query } from 'express';

@Controller('rider')
@UseGuards(AuthGuard)
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  @Post('register')
  async createRider(@Body() createRiderDto: CreateRiderDto) {
    return await this.riderService.createRider(createRiderDto);
  }

  @Put('update/:riderId')
  async updateRider(
    @Param('riderId') riderId: string,
    @Body() updateRiderDto: UpdateRiderDto,
  ) {
    return await this.riderService.updateRider(updateRiderDto, riderId);
  }

  @Get('list')
  async getRiders(@Query(ValidationPipe) query: GetRidersQueryDto) {
    return await this.riderService.getRiders(query);
  }

  @Get('/:rider/deliveries')
  async getRiderDeliveries(
    @Param('rider') rider: string,
    @Query(ValidationPipe) query: GetDeliveriesQueryDto,
  ) {
    return await this.riderService.getRiderDeliveries(rider, query);
  }

  @Get(':riderId')
  async getRiderDetails(@Param('riderId') riderId: string) {
    return await this.riderService.getRiderDetails(riderId);
  }

  @Get(':riderId')
  async getRiderWalletDetails(@Param('riderId') riderId: string) {
    return await this.riderService.getRiderWalletDetails(riderId);
  }

  @Put(':riderId/approval')
  async approveOrDisapprove(
    @Param('riderId') riderId: string,
    @Body('approve') approve: boolean,
  ) {
    return await this.riderService.approveOrDisapprove(riderId, approve);
  }

  @Post('/work-area/add')
  async addWorkArea(@Body() addWorkAreaBody: AddWorkAreaDto) {
    return await this.riderService.addWorkArea(addWorkAreaBody);
  }
  @Get('/work-area/list')
  async getWorkAreas(@Query(ValidationPipe) query: GetWorkAreasQueryDto) {
    return await this.riderService.getWorkAreas(query);
  }

  @Get('/work-area/:workAreaId/session/list')
  async getWorkAreaSession(
    @Param('workAreaId') workAreaId: string,
    @Query(ValidationPipe) query: GetWorkAreasQueryDto,
  ) {
    return await this.riderService.getWorkAreaSession(workAreaId, query);
  }
  @Get('/work-area/:workAreaId/session/:sessionId/rider-list')
  async getBookedRidersPerSession(
    @Param('workAreaId') workAreaId: string,
    @Param('sessionId') sessionId: string,
    @Query(ValidationPipe) query: GetWorkAreasQueryDto,
  ) {
    return await this.riderService.getBookedRidersPerSession(
      workAreaId,
      sessionId,
      query,
    );
  }
  @Delete(':riderId')
  async delete(@Param('riderId') riderId: string) {
    return await this.riderService.delete(riderId);
  }
}
