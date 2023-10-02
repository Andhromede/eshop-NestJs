import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductPromotionService } from './product-promotion.service';
import { CreateProductPromotionDto } from '../product-promotion/dto/create-product-promotion.dto';
import { UpdateProductPromotionDto } from './dto/update-product-promotion.dto';


@Controller('product-promotion')
export class ProductPromotionController {
  constructor(private readonly productPromotionService: ProductPromotionService) {}

  @Post()
  create(@Body() createProductPromotionDto: CreateProductPromotionDto) {
    return this.productPromotionService.create(createProductPromotionDto);
  }

  @Get()
  findAll() {
    return this.productPromotionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productPromotionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductPromotionDto: UpdateProductPromotionDto) {
    return this.productPromotionService.update(+id, updateProductPromotionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPromotionService.remove(+id);
  }
}
