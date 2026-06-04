import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ItemsService } from './items.service';
import { NotFoundException } from '@nestjs/common';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an item', () => {
    const dto = { name: 'Test Item', description: 'Test Description' };
    const item = service.create(dto);
    expect(item).toEqual({
      id: 1,
      ...dto,
    });
    expect(service.findAll()).toHaveLength(1);
  });

  it('should find all items', () => {
    service.create({ name: 'Item 1' });
    service.create({ name: 'Item 2' });
    expect(service.findAll()).toHaveLength(2);
  });

  it('should find one item by id', () => {
    const created = service.create({ name: 'Test' });
    const found = service.findOne(created.id);
    expect(found).toEqual(created);
  });

  it('should throw NotFoundException when finding non-existent item', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('should update an item', () => {
    const created = service.create({ name: 'Old Name' });
    const updated = service.update(created.id, { name: 'New Name' });
    expect(updated.name).toBe('New Name');
  });

  it('should remove an item', () => {
    const created = service.create({ name: 'To Delete' });
    service.remove(created.id);
    expect(service.findAll()).toHaveLength(0);
  });
});
