/**
 * @jest-environment node
 */

const request = require('supertest');
const app = require('../../app');
const Bcrypt = require('bcrypt');

describe('User Endpoints', () => {
  describe('Signup api', () => {
    it('should create a new user and return status code 201', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'John Doe',
          email: 'johndoe@xyz.com',
          password: 'Passw0rd',
          confirmPassword: 'Passw0rd',
          isAdmin: true
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('name');
      expect(res.body.data).toHaveProperty('email');
      expect(res.body.data).toHaveProperty('isAdmin');
    });

    it('should return status code 409 when creating an account with an existing email address', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'John Doe',
          email: 'johndoe@xyz.com',
          password: 'Passw0rd',
          confirmPassword: 'Passw0rd',
          isAdmin: true
        });
      expect(res.statusCode).toEqual(409);
      expect(res.body.message).toEqual('Email already exists');
    });

    it('should return status code 400 if name is missing', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'johndoe@xy.com',
          password: 'Passw0rd',
          confirmPassword: 'Passw0rd',
          isAdmin: true
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Name is required');
    });

    it('should return status code 400 if email is missing', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'Bigi jfik',
          password: 'Passw0rd',
          confirmPassword: 'Passw0rd',
          isAdmin: true
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Invalid Email Format: abcd@efg.xxx');
    });

    it('should return status code 400 if password length is less than 8', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'Bigi jfik',
          email: 'bigi@xy.com',
          password: 'Passw0r',
          confirmPassword: 'Passw0rd',
          isAdmin: true
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Password must be between 8 to 40 characters');
    });

    it('should return status code 400 if password doesn\'t contain a number', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'Bigi jfik',
          email: 'bigi@xy.com',
          password: 'Password',
          confirmPassword: 'Passw0rd',
          isAdmin: true
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Password must contain one number');
    });

    it('should return status code 400 if password doesn\'t contain an alphabet', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'Bigi jfik',
          email: 'big@xy.com',
          password: '46729647',
          confirmPassword: 'Passw0rd',
          isAdmin: true
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Password must contain at least one alphabet');
    });

    it('should return status code 400 if password and compare password don\'t contain an match', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'Bigi jfik',
          email: 'bigi56@xy.com',
          password: 'passw0rd',
          confirmPassword: 'Pa$sw0rd',
          isAdmin: true
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Password does not match');
    });
  });

  describe('Login api', () => {
    it('should login a user', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'johndoe@xyz.com',
          password: 'Passw0rd'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data).toHaveProperty('name');
      expect(res.body.data).toHaveProperty('email');
      expect(res.body.data).toHaveProperty('isAdmin');
    });

    it('should return status code 400 when users password is not correct', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'johndoe@xyz.com',
          password: 'Passw0rrd'
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Invalid user details');
    });

    it('should return status code 404 if user doesn\'t exist', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'john@xy.com',
          password: 'Passw0rd'
        });
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual('User not found');
    });

    it('should return status code 400 if email is missing', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          password: 'Passw0rd'
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Invalid Email Format: abcd@efg.xxx');
    });

    it('should return status code 400 if password length is less than 8', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'johndoe@xyz.com',
          password: 'Passw0r',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Password must be between 8 to 40 characters');
    });

    it('should return status code 400 if password doesn\'t contain a number', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'johndoe@xyz.com',
          password: 'Password'
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Password must contain one number');
    });

    it('should return status code 400 if password doesn\'t contain an alphabet', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'johndoe@xyz.com',
          password: '46729647'
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Password must contain at least one alphabet');
    });
  });
});