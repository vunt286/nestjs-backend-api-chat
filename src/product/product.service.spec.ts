import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';

describe('ProductService', () => {
  let service: ProductService;
  let productModel: any;

  beforeEach(async () => {
    productModel = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(Product.name),
          useValue: productModel
        }
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create product', async () => {
    const dto = {name: 'demo'};
    const prodCreate = {...dto, id: 2};

    productModel.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(prodCreate)
    }));

    const result = await service.create(dto);

    expect(result).toEqual(prodCreate);
  });

  
});
