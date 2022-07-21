const request = require('supertest');
const app = require('../../../app');

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get('/launch')
            .expect('Content-Type', /json/)
            .expect(200);

    });
});
// .toBe()
// .toMatchObejct()
describe('Test POST /launches', () => {
    const completeLaunchData = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'January 4, 2028',
    }
    const LaunchDataWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        
    }
    test('It should respond with 201 success', async () => {
        const response = await request(app)
            .post('/launch')
            .send(completeLaunchData)
            .expect('Content-Type',/json/ )
            .expect(201);
        const requestDate =  new Date(completeLaunchData.launchDate).valueOf();
        const responseDate =  new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);
        expect(response.body).toMatchObject(LaunchDataWithoutDate)
    });
    test('IT should catch missing required properties', () => {});
    test('IT should catch invalid dates', () => {});
})