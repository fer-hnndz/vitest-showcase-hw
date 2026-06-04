import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        {
          provide: ItemsService,
          useValue: {
            create: vi.fn().mockImplementation((dto) => ({ id: 1, ...dto })),
            findAll: vi.fn().mockReturnValue([]),
            findOne: vi.fn().mockImplementation((id) => ({ id, name: 'Test' })),
            update: vi.fn().mockImplementation((id, dto) => ({ id, ...dto })),
            remove: vi.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create', () => {
    const dto = { name: 'Test' };
    expect(controller.create(dto)).toEqual({ id: 1, ...dto });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should call service.findAll', () => {
    expect(controller.findAll()).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call service.findOne', () => {
    expect(controller.findOne(1)).toEqual({ id: 1, name: 'Test' });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should call service.update', () => {
    const dto = { name: 'Updated' };
    expect(controller.update(1, dto)).toEqual({ id: 1, ...dto });
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should call service.remove', () => {
    expect(controller.remove(1)).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
