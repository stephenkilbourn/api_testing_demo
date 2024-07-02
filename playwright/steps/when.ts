import { APIRequestContext } from "@playwright/test";

const apiURL = process.env.API_URL;


const we_invoke_get_current_weather = async (request: APIRequestContext, location?: string, apiKey?: string, ) => {
  const path='current.json'
  const url = `${apiURL}/${path}?q=${location}${apiKey ? `&key=${apiKey}` : ''}`;
  return await request.get(url);
};

const we_invoke_get_forecast = async (request: APIRequestContext, location?: string, days?: Number, apiKey?: string, ) => {
  const path='forecast.json'
  const url = `${apiURL}/${path}?q=${location}&days=${days?.toString()}${apiKey ? `&key=${apiKey}` : ''}`;
  return await request.get(url);
};

export {
  we_invoke_get_current_weather,
  we_invoke_get_forecast,
}

