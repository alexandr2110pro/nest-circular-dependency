import * as express from 'express';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { BarModule } from './bar.module';

describe('BarModule', () => {
  const server = express();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [BarModule],
    }).compile();

    const app = module.createNestApplication(server);
    await app.init();
  });

  describe('GET /bar', () => {
    it('should return `bar`', () => {
      return request(server)
        .get('/bar')
        .expect(HttpStatus.OK)
        .then((resp: any) => {
          expect(resp.body).toEqual({ data: 'bar works!' });
        });
    });
  });
});
