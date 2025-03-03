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
  ValidationPipe,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import {
  CreateVendorCategoryDto,
  CreateVendorDto,
  CreateVendorSubCategoryDto,
  GetVendorsDto,
  GetVendorSubCategoriesDto,
  UpdateVendorDto,
} from './vendor.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { query } from 'express';

@Controller('vendor')
@UseGuards(AuthGuard)
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post('register')
  async createVendor(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.createVendor(createVendorDto);
  }

  @Put('update/:vendorId')
  async updateVendor(
    @Param('vendorId') vendorId: string,
    @Body() updateVendorDto: UpdateVendorDto,
  ) {
    return this.vendorService.updateVendor(updateVendorDto, vendorId);
  }

  @Get('list')
  async getVendors(
    @Query(ValidationPipe) query: GetVendorsDto
  ) {
    return this.vendorService.getVendors(
      query
    );
  }

  @Get(':vendorId')
  async getVendorDetails(@Param('vendorId') vendorId: string) {
    return this.vendorService.getVendorDetails(vendorId);
  }

  @Put(':vendorId/approval')
  async approveOrDisapprove(
    @Param('vendorId') vendorId: string,
    @Body('approve') approve: boolean,
  ) {
    return this.vendorService.approveOrDisapprove(vendorId, approve);
  }

  @Post('category')
  async createVendorCategory(
    @Body() createVendorCategoryDto: CreateVendorCategoryDto,
  ) {
    return this.vendorService.createVendorCategory(createVendorCategoryDto);
  }

  @Get('categories')
  async getVendorCategories() {
    return this.vendorService.getVendorCategories();
  }

  @Post('sub-category')
  async createVendorSubCategory(
    @Body() createVendorSubCategoryDto: CreateVendorSubCategoryDto,
  ) {
    return this.vendorService.createVendorSubCategory(
      createVendorSubCategoryDto,
    );
  }

  @Get('categories/:category/sub-categories')
  async getVendorSubCategories(
    @Param('category') category: string,
    @Query(ValidationPipe) query: GetVendorSubCategoriesDto
  ) {
    return this.vendorService.getVendorSubCategories(category, query);
  }

  @Get('top-vendors')
  async getTopVendors(@Query(ValidationPipe) query: GetVendorsDto) {
    return this.vendorService.getTopVendors(query);
  }

  @Get('top-categories')
  async getTopVendorCategories(
    @Query(ValidationPipe) query: GetVendorSubCategoriesDto
  ) {
    return this.vendorService.getTopVendorCategories(query);
  }

  @Get('summary')
  async getVendorSummary() {
    return this.vendorService.getVendorSummary();
  }

  @Get('metrics')
  async getVendorMetrics() {
    return this.vendorService.getVendorMetrics();
  }
}
