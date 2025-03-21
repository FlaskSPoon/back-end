import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('WebunaireController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  let createdWebinaireId: number;

  it('POST /webunaire → créer un webinaire', async () => {
    const webinaireData = {
      title: 'Test Webinaire',
      description: 'Description du webinaire',
      dateWebinaire: new Date().toISOString(),
      category: 1,
    };

    const res = await request(app.getHttpServer()).post('/webunaire').send(webinaireData);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdWebinaireId = res.body.id;
  });

  it('GET /webunaire → récupérer tous les webinaires', async () => {
    const res = await request(app.getHttpServer()).get('/webunaire');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /webunaire/:id → récupérer un webinaire spécifique', async () => {
    const res = await request(app.getHttpServer()).get(`/webunaire/${createdWebinaireId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdWebinaireId);
  });

  it('PATCH /webunaire/:id → mettre à jour un webinaire', async () => {
    const updateData = {
      title: 'Titre modifié',
    };

    const res = await request(app.getHttpServer()).patch(`/webunaire/${createdWebinaireId}`).send(updateData);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Titre modifié');
  });

  it('DELETE /webunaire/:id → supprimer un webinaire', async () => {
    const res = await request(app.getHttpServer()).delete(`/webunaire/${createdWebinaireId}`);
    expect(res.status).toBe(200);
  });
});
