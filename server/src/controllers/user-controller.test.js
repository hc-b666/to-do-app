const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { db } = require('../database/database');
const userRoutes = require('../routes/user-routes');

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

jest.mock('bcrypt', () => ({
  hashSync: jest.fn().mockReturnValue('hashedPassword'),
  compareSync: jest.fn().mockReturnValue(true)
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('token')
}));

describe('User Controller', () => {
  describe('POST /api/users/signup', () => {
    beforeEach(() => {
      jest.spyOn(db, 'get').mockImplementation((sql, params, callback) => {
        callback(null, null); 
      });

      jest.spyOn(db, 'run').mockImplementation((sql, params, callback) => {
        callback(null);
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should create a new user and return a token', async () => {
      const response = await request(app)
        .post('/api/users/signup')
        .send({ username: 'testuser', password: 'password123' });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('token', 'token');
    });

    it('should return 400 if username or password is missing', async () => {
      const response = await request(app)
        .post('/api/users/signup')
        .send({ username: '', password: '' });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', 'Invalid username or password');
    });

    it('should return 400 if username already exists', async () => {
      db.get.mockImplementation((sql, params, callback) => {
        callback(null, { id: 1, username: 'testuser', password: 'hashedPassword' }); 
      });

      const response = await request(app)
        .post('/api/users/signup')
        .send({ username: 'testuser', password: 'password123' });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', 'Username already exists');
    });
  });
});
