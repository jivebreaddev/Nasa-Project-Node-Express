const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
    test('It should respond with 200 success', () => {
        const response = request();
        expect(response).toBe(200);
    });
});

describe('Test POST /launches', () => {
    test('It should respond with 200 success', () => {

    });
    test('IT should catch missing required properties', () => {});
    test('IT should catch invalid dates', () => {});
})