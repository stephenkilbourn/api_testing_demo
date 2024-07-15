import { we_invoke_get_forecast } from '../steps/when';
import { an_authenticated_user } from '../steps/given';

const location = 'Hamilton';
const badLocation = 'badLocation';
const forecastLength = 2;
describe('given an authenticated user', () => {

  describe('when we invoke the GET forecast endpoint', () => {
    it('should return a 200 response', async () => {
      const resp = await we_invoke_get_forecast(location, forecastLength, an_authenticated_user);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toBeDefined();
    });

    it('should return the location in the response', async () => {
      const resp = await we_invoke_get_forecast(location, forecastLength, an_authenticated_user);
      expect(resp.body).toBeDefined();
      expect(resp.body.location).toBeDefined();
      expect(resp.body.location.name).toBe('Hamilton')
    });

    it('should return the current weather with expected keys', async () => {
      const resp = await we_invoke_get_forecast(location, forecastLength,  an_authenticated_user);
      expect(resp.body).toBeDefined();

      expect(resp.body.current).toEqual({
          "last_updated_epoch": expect.any(Number),
          "last_updated": expect.any(String),
          "temp_c": expect.any(Number),
          "temp_f": expect.any(Number),
          "is_day": expect.any(Number),
          "condition": {
            "text": expect.any(String),
            "icon": expect.any(String),
            "code": expect.any(Number)
          },
          "wind_mph": expect.any(Number),
          "wind_kph": expect.any(Number),
          "wind_degree": expect.any(Number),
          "wind_dir": expect.any(String),
          "pressure_mb": expect.any(Number),
          "pressure_in": expect.any(Number),
          "precip_mm": expect.any(Number),
          "precip_in": expect.any(Number),
          "humidity": expect.any(Number),
          "cloud": expect.any(Number),
          "dewpoint_c": expect.any(Number),
          "dewpoint_f": expect.any(Number),
          "feelslike_c": expect.any(Number),
          "feelslike_f": expect.any(Number),
          "vis_km": expect.any(Number),
          "vis_miles": expect.any(Number),
          "uv": expect.any(Number),
          "gust_mph": expect.any(Number),
          "gust_kph": expect.any(Number),
          "heatindex_c": expect.any(Number),
          "heatindex_f": expect.any(Number),
          "windchill_f": expect.any(Number),
          "windchill_c": expect.any(Number),
        })
    });

    it('should return n array of forecast days', async () => {
      const resp = await we_invoke_get_forecast(location,forecastLength,  an_authenticated_user);
      expect(resp.body).toBeDefined();

      expect(resp.body.forecast).toBeDefined();
      expect(resp.body.forecast).toHaveProperty('forecastday')
      expect(resp.body.forecast.forecastday.length).toEqual(forecastLength)
    });

    it('each forecast day should have expected properties', async () => {
      const resp = await we_invoke_get_forecast(location,forecastLength,  an_authenticated_user);
      for( const day of resp.body.forecast.forecastday) {
        expect(day).toHaveProperty("date")
        expect(day).toHaveProperty("date_epoch"),
        expect(day).toHaveProperty("day"),
        expect(day).toHaveProperty("astro"),
        expect(day).toHaveProperty("hour")
      }
    })
  });

  describe('when we have invalid location parameters', () => {
    it('should return a 400 response for empty q parameter', async () => {
      const resp = await we_invoke_get_forecast('', forecastLength, an_authenticated_user);
      expect(resp.statusCode).toBe(400);
      expect(resp.body.error.code).toBe(1003);
      expect(resp.body.error.message).toMatch(/Parameter q is missing/i);
    });

    it('should return a 400 response for unknown location', async () => {
      const resp = await we_invoke_get_forecast(badLocation, forecastLength, an_authenticated_user);
      expect(resp.statusCode).toBe(400);
      expect(resp.body.error.code).toBe(1006);
      expect(resp.body.error.message).toMatch(/No matching location found/i);
    });

  });

  
  
});

describe('given a bad api key user', () => {

  const badApiKey = '123456789'

  describe('when we invoke the GET current weather endpoint', () => {
    it('should return a 403 response', async () => {
      const resp = await we_invoke_get_forecast(location, 2, badApiKey);
      expect(resp.statusCode).toBe(403);
    });
  });
});