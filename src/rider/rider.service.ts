import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiService } from 'src/lib/apiCalls';
import {
  AddWorkAreaDto,
  CreateRiderDto,
  CreateTimeSlotDto,
  GetDeliveriesQueryDto,
  GetRidersQueryDto,
  GetTimeSlotQueryDto,
  GetWorkAreasQueryDto,
  UpdateRiderDto,
} from './rider.dto';
@Injectable()
export class RiderService {
  constructor(private readonly apiService: ApiService) {}

  async createRider(createRiderDto: CreateRiderDto): Promise<any> {
    try {
      const newCreateRider = {
        ...createRiderDto,
        password: this.generateRandomPassword(),
      };
      return await this.apiService.post('/admin/riders', newCreateRider);
    } catch (error) {
      throw new BadRequestException(error.message);
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
      throw new BadRequestException(error.message);
    }
  }

  async getRiders(query: GetRidersQueryDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/riders', query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getRiderDeliveries(
    rider: string,
    query: GetDeliveriesQueryDto,
  ): Promise<any> {
    try {
      return await this.apiService.get(
        `/admin/rider/${rider}/deliveries`,
        query,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getRiderDetails(riderId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/riders/${riderId}`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getRiderWalletDetails(riderId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/riders/${riderId}/wallet`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async approveOrDisapprove(riderId: string, approve: boolean): Promise<any> {
    try {
      return await this.apiService.put(`/admin/riders/${riderId}/approval`, {
        approve,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addWorkArea(addWorkAreaBody: AddWorkAreaDto): Promise<any> {
    try {
      return await this.apiService.post('/admin/work-areas', addWorkAreaBody);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getWorkAreas(query: GetWorkAreasQueryDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/work-areas', query);
    } catch (error) {
      throw new BadRequestException(error.message);
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
      throw new BadRequestException(error.message);
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
      throw new BadRequestException(error.message);
    }
  }

  async delete(riderId: string): Promise<any> {
    try {
      return await this.apiService.delete(`/admin/riders/${riderId}/delete`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async insertTimeSlot(data: CreateTimeSlotDto): Promise<any> {
    try {
      return await this.apiService.post(`/admin/work-areas/time-slot`, data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTimeSlots(query: GetTimeSlotQueryDto): Promise<any> {
    try {
      return await this.apiService.get(`/admin/work-areas/time-slot`, query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTimeSlot(timeSlotId: string): Promise<any> {
    try {
      return await this.apiService.get(
        `/admin/work-areas/time-slot/${timeSlotId}`,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteTimeSlot(timeSlotId: string): Promise<any> {
    try {
      return await this.apiService.delete(
        `/admin/work-areas/time-slot/${timeSlotId}`,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private generateRandomPassword(length: number = 12): string {
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-`~[]{}|;\':",./<>?';
    let password = '';

    const requirements = [
      /[a-z]/,
      /[A-Z]/,
      /[0-9]/,
      /[!@#$%^&*()_+\-=`~[\]{}\\|;':",./<>?]/,
    ];

    for (const regex of requirements) {
      let char;
      do {
        char = characters[Math.floor(Math.random() * characters.length)];
      } while (!regex.test(char)); // Keep trying until we have a match
      password += char;
    }

    const remainingLength = length - requirements.length;
    for (let i = 0; i < remainingLength; i++) {
      password += characters[Math.floor(Math.random() * characters.length)];
    }

    password = password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
    return password;
  }
}
