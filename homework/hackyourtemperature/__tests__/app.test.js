import app from '../app.js';
import request from 'supertest';

describe('POST /weather', () => {
  describe('when passed a correct request', () => {
    test('status code is 200', async () => {
      const response = await request(app).post('/weather').send({
        cityName: 'London',
      });
      expect(response.statusCode).toBe(200);
    });
    test('json as the content type in the http header', async () => {
      const response = await request(app).post('/weather').send({
        cityName: 'London',
      });
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json'),
      );
    });
  });
});
