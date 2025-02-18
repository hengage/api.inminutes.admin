import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import {
  CreateVendorCategoryDto,
  CreateVendorDto,
  CreateVendorSubCategoryDto,
  UpdateVendorDto,
} from './vendor.dto';

@Controller('vendor')
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
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Query('category') category: string = '',
    @Query('subCategory') subCategory: string = '',
    @Query('status') status: string = '',
  ) {
    return this.vendorService.getVendors(
      page,
      limit,
      search,
      category,
      subCategory,
      status,
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
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.vendorService.getVendorSubCategories(category, page, limit);
  }
}
