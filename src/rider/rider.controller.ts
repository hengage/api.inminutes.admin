import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { RiderService } from './rider.service';
import {
  AddWorkAreaDto,
  CreateRiderDto,
  CreateTimeSlotDto,
  GetDeliveriesQueryDto,
  GetNearbyRidersQueryDto,
  GetRidersQueryDto,
  GetTimeSlotQueryDto,
  GetWorkAreasQueryDto,
  UpdateRiderDto,
} from './rider.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('riders')
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

  @Get('')
  async getRiders(@Query(ValidationPipe) query: GetRidersQueryDto) {
    return await this.riderService.getRiders(query);
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

  @Post('time-slot')
  async createTimeSlot(@Body() createTimeSlotDto: CreateTimeSlotDto) {
    return this.riderService.insertTimeSlot(createTimeSlotDto);
  }

  @Get('time-slot')
  async getTimeSlots(@Query() query: GetTimeSlotQueryDto) {
    return this.riderService.getTimeSlots(query);
  }

  @Get('time-slot/:id')
  async getTimeSlot(@Param() id: string) {
    return this.riderService.getTimeSlot(id);
  }

  @Delete('time-slot/:id')
  async deleteTimeSlot(@Param() id: string) {
    return this.riderService.deleteTimeSlot(id);
  }

  @Get('nearby-working')
  async getNearyByRiders(@Query() query: GetNearbyRidersQueryDto) {
    return this.riderService.getNearByRiders(query);
  }

  @Get(':riderId/wallet')
  async getRiderWallet(@Param('riderId') riderId: string) {
    return this.riderService.getRiderWalletDetails(riderId);
  }

  @Get(':riderId')
  async getRiderDetails(@Param('riderId') riderId: string) {
    return this.riderService.getRiderDetails(riderId);
  }

  @Delete(':riderId')
  async delete(@Param('riderId') riderId: string) {
    return await this.riderService.delete(riderId);
  }
}
