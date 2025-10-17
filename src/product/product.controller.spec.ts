import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn()
          }
        }

      ],
    })
    .compile();

    controller = module.get<ProductController>(ProductController);
    service =  module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  describe('unit test create product', () => {
    it('create success', async () => {
      const dto: CreateProductDto = {name: "abc"};
      const result = {...dto, id: 1};
      (service.create as jest.Mock).mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
    });

  });


});
