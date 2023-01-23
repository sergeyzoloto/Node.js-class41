import app from '../app.js';
import request from 'supertest';

describe('POST /weather', () => {
  it('when passed a correct request, a response contains required body in JSON and correct status code', async () => {
    const city = 'London';
    const response = await request(app).post('/weather').send({
      cityName: city,
    });
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json'),
    );
    expect(response.body.cityName).toEqual(city);
    expect(response.body.weatherText).toBeDefined();
    expect(response.body.weatherText).toContain(city);
  });
  it('when passed a request with no existing city name, a response contains error message and 404 status code', async () => {
    const response = await request(app).post('/weather').send({
      cityName: 'Londonn',
    });
    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json'),
    );
    expect(response.body.weatherText).toEqual('City is not found!');
  });
  it('when passed a correct request to a wrong endpoint', async () => {
    const response = await request(app).post('/weaher/').send({
      cityName: 'London',
    });
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({});
  });
});
