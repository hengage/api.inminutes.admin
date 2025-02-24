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
import { ProductService } from './product.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from './product.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('register')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Put('update/:productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(updateProductDto, productId);
  }

  @Get('list')
  async getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Query('category') category: string = '',
    @Query('subCategory') subCategory: string = '',
    @Query('status') status: string = '',
    @Query('maxPrice') maxPrice: number,
    @Query('minPrice') minPrice: number,
    @Query('startDate') startDate: Date,
    @Query('wndDate') endDate: Date,
  ) {
    return this.productService.getProducts(
      page,
      limit,
      search,
      category,
      maxPrice,
      minPrice,
      startDate,
      endDate,
      status,
    );
  }

  @Get(':productId')
  async getProductDetails(@Param('productId') productId: string) {
    return this.productService.getProductDetails(productId);
  }

  @Put(':productId/approval')
  async approveOrDisapprove(
    @Param('productId') productId: string,
    @Body('approve') approve: boolean,
  ) {
    return this.productService.approveOrDisapprove(productId, approve);
  }

  @Post('category')
  async createProductCategory(
    @Body() name: string,
  ) {
    return this.productService.createProductCategory(name);
  }

  @Get('categories')
  async getProductCategories() {
    return this.productService.getProductCategories();
  }

  @Post('sub-category')
  async createProductSubCategory(
    @Body() name: string
  ) {
    return this.productService.createProductSubCategory(
      name
    );
  }

  @Get('categories/:category/sub-categories')
  async getProductSubCategories(
    @Param('category') category: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.productService.getProductSubCategories(category, page, limit);
  }

  @Delete(':productId')
  async delete(@Param('productId') productId: string) {
    return this.productService.delete(productId);
  }
}
