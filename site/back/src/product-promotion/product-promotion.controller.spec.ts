import { Test, TestingModule } from '@nestjs/testing';
import { ProductPromotionController } from './product-promotion.controller';
import { ProductPromotionService } from './product-promotion.service';


describe('ProductPromotionController', () => {
  let controller: ProductPromotionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductPromotionController],
      providers: [ProductPromotionService],
    }).compile();

    controller = module.get<ProductPromotionController>(ProductPromotionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
