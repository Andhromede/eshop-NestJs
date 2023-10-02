import { Test, TestingModule } from '@nestjs/testing';
import { ProductPromotionService } from './product-promotion.service';


describe('ProductPromotionService', () => {
  let service: ProductPromotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductPromotionService],
    }).compile();

    service = module.get<ProductPromotionService>(ProductPromotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
