import axios from 'axios';
import 'dotenv/config'


const apiURL = process.env.API_URL;

//  axios has different response structure to our Lambda function
// the respondFrom function converts the axios response to what we need for the tests
const respondFrom = async (axiosResp: {
  status: any;
  data: any;
  headers: any;
}) => ({
  statusCode: axiosResp.status,
  body: axiosResp.data,
  headers: axiosResp.headers,
});

const makeHttpRequest = async (
  method: string,
  url: string,
  headers: { accept: string },
  data?: any
) => {
  try {
    const resp = await axios.request({ method, url, headers, data });

    return await respondFrom(resp);
  } catch (err: any) {
    // catch error from axios to allow for jest
    return {
      statusCode: err.response.status,
      headers: err.response.headers,
      body: err.response.data,
    };
  }
};

const we_invoke_get_current_weather = async (location?: string, apiKey?: string, ) => {
  const headers = {
    accept: 'application/json',
  };
  const method = 'GET';
  const path = 'current.json';
  const url = `${apiURL}/${path}?q=${location}${apiKey ? `&key=${apiKey}` : ''}`;

  return makeHttpRequest(method, url, headers);
};

const we_invoke_get_forecast = async (location?: string, days?: Number, apiKey?: string, ) => {
  const headers = {
    accept: 'application/json',
  };
  // forecast.json?q=59840&days=6&key=
  const method = 'GET';
  const path = 'forecast.json';
  const url = `${apiURL}/${path}?q=${location}&days=${days?.toString()}${apiKey ? `&key=${apiKey}` : ''}`;

  return makeHttpRequest(method, url, headers);
};

export {
  we_invoke_get_current_weather,
  we_invoke_get_forecast,
}

