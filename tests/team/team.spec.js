/**
 * @jest-environment node
 */

const request = require('supertest');
const app = require('../../app');

const users = require('../mock/users');
const generateToken = require('../mock/jwt');

const session = require('../../middlewares/session')

const {
  adminUser,
  nonAdminUser
} = users;
nonAdminTokenToken = generateToken(adminUser)
adminToken = generateToken(nonAdminUser);

describe('Team Endpoint', () => {
  describe('Create Team', () => {
    it('should a new team and return status code 201', async (req) => {
      // req.session.key = adminUser
      // const res = await request(app)
      //   .post('/api/v1/teams')
      //   .set('authorization', `Bearer ${adminToken}`)
      //   .send({
      //     teamName: "madrid",
      //     teamManagerName: "Zidane",
      //     teamPlayers: 'Michy, Cesar, Zouma, Barkley, Christensen, Caballero'
      //   });
      expect(req.session.key).toBe(true);
      // expect(res.statusCode).toEqual(201);
      // expect(res.body.data).toHaveProperty('teamId');
      // expect(res.body.data).toHaveProperty('teamManager');
      // expect(res.body.data).toHaveProperty('teamPlayers');
    });
  })
})