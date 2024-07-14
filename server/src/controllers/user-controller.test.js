const request = require('supertest');
const app = require('../server');

describe('User routes', () => {
  describe('POST /api/users/signup', () => {
    it('should return 400 if no username or password is provided', async () => {
      const res = await request(app)
        .post('/api/users/signup')
        .send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 if username already exists', async () => {
      const res = await request(app)
        .post('/api/users/signup')
        .send({ username: 'test', password: 'test' });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 201 if user is created', async () => {
      const res = await request(app)
        .post('/api/users/signup')
        .send({ username: 'test2', password: 'test2' });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
    });
  });
  describe('POST /api/users/signin', () => {
    it('should return 400 if no username or password is provided', async () => {
      const res = await request(app)
        .post('/api/users/signin')
        .send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 if username or password is incorrect', async () => {
      const res = await request(app)
        .post('/api/users/signin')
        .send({ username: 'test', password: 'test' });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 200 if user is signed in', async () => {
      const res = await request(app)
        .post('/api/users/signin')
        .send({ username: 'test2', password: 'test2' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });
  });
});
