import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/items (CRUD)', () => {
    it('should create, find, update and delete an item', async () => {
      // Create
      const createResponse = await request(app.getHttpServer())
        .post('/items')
        .send({ name: 'E2E Item' })
        .expect(201);
      
      const itemId = createResponse.body.id;
      expect(itemId).toBeDefined();

      // Find All
      const findAllResponse = await request(app.getHttpServer())
        .get('/items')
        .expect(200);
      expect(findAllResponse.body).toHaveLength(1);

      // Find One
      const findOneResponse = await request(app.getHttpServer())
        .get(`/items/${itemId}`)
        .expect(200);
      expect(findOneResponse.body.name).toBe('E2E Item');

      // Update
      const updateResponse = await request(app.getHttpServer())
        .patch(`/items/${itemId}`)
        .send({ name: 'Updated E2E Item' })
        .expect(200);
      expect(updateResponse.body.name).toBe('Updated E2E Item');

      // Delete
      await request(app.getHttpServer())
        .delete(`/items/${itemId}`)
        .expect(200);
      
      // Find One (Should fail)
      await request(app.getHttpServer())
        .get(`/items/${itemId}`)
        .expect(404);
    });
  });
});
