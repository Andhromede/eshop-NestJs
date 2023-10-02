import { Module } from '@nestjs/common';
import { ProductPromotionService } from './product-promotion.service';
import { ProductPromotionController } from './product-promotion.controller';


@Module({
  controllers: [ProductPromotionController],
  providers: [ProductPromotionService],
})
export class ProductPromotionModule {}
