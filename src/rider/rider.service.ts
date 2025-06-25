import { Injectable } from '@nestjs/common';
import { throwHttpException } from 'src/lib';
import { ApiService } from 'src/lib/apiCalls';
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
import { generateRandomPassword } from 'src/auth';
@Injectable()
export class RiderService {
  constructor(private readonly apiService: ApiService) {}

  async createRider(createRiderDto: CreateRiderDto): Promise<any> {
    try {
      const newCreateRider = {
        ...createRiderDto,
        password: generateRandomPassword(),
      };
      return await this.apiService.post('/admin/riders', newCreateRider);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async updateRider(
    updateRiderDto: UpdateRiderDto,
    riderId: string,
  ): Promise<any> {
    try {
      return await this.apiService.put(
        `/admin/riders/${riderId}`,
        updateRiderDto,
      );
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getRiders(query: GetRidersQueryDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/riders', query);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getRiderDetails(riderId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/riders/${riderId}`);
    } catch (error) {
      throwHttpException(error);
    }
  }
  async getRiderWalletDetails(riderId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/riders/${riderId}/wallet`);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async approveOrDisapprove(riderId: string, approve: boolean): Promise<any> {
    try {
      return await this.apiService.put(`/admin/riders/${riderId}/approval`, {
        approve,
      });
    } catch (error) {
      throwHttpException(error);
    }
  }

  async addWorkArea(addWorkAreaBody: AddWorkAreaDto): Promise<any> {
    try {
      return await this.apiService.post('/admin/work-areas', addWorkAreaBody);
    } catch (error) {
      throwHttpException(error);
    }
  }
  async getWorkAreas(query: GetWorkAreasQueryDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/work-areas', query);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getWorkAreaSession(
    workAreaId: string,
    query: GetWorkAreasQueryDto,
  ): Promise<any> {
    try {
      return await this.apiService.get(
        `/admin/work-areas/${workAreaId}/sessions`,
        query,
      );
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getBookedRidersPerSession(
    workAreaId: string,
    sessionsId: string,
    query: GetWorkAreasQueryDto,
  ): Promise<any> {
    try {
      return await this.apiService.get(
        `/admin/work-areas/${workAreaId}/sessions/${sessionsId}/riders`,
        query,
      );
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getNearByRiders(query: GetNearbyRidersQueryDto): Promise<any> {
    try {
      return await this.apiService.get(`/admin/riders/nearby-working`, query);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async delete(riderId: string): Promise<any> {
    try {
      return await this.apiService.delete(`/admin/riders/${riderId}/delete`);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async insertTimeSlot(data: CreateTimeSlotDto): Promise<any> {
    try {
      return await this.apiService.post(`/admin/work-areas/time-slot`, data);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getTimeSlots(query: GetTimeSlotQueryDto): Promise<any> {
    try {
      return await this.apiService.get(`/admin/work-areas/time-slot`, query);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getTimeSlot(timeSlotId: string): Promise<any> {
    try {
      return await this.apiService.get(
        `/admin/work-areas/time-slot/${timeSlotId}`,
      );
    } catch (error) {
      throwHttpException(error);
    }
  }

  async deleteTimeSlot(timeSlotId: string): Promise<any> {
    try {
      return await this.apiService.delete(
        `/admin/work-areas/time-slot/${timeSlotId}`,
      );
    } catch (error) {
      throwHttpException(error);
    }
  }
}
