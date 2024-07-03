# Comparing API Testing with Postman (& Newman), Playwright, and Jest/Axios
This presentation was created for the [Automation Guild 2024](https://testguild.com/automation-guild-2024/)


I am using the free tier of the Weather Api from [WeatherApi.com](https://www.weatherapi.com/)
 To demonstrate ways to test this api using the three different toolsets.

## Setup

To run the tests yourself, obtain an account and API key from Weather API, then create your own `.env` file:

```sh
cp .env.sample .env.
```

Place your personal API key as the value in that new `.env` file.

Now install your dependencies:

```sh
npm install
```

## Running Test
Each toolset has an npm script to make running straightforward:

### Jest

```sh
npm run test:jest
```
### Postman/Newman

```sh
npm run test:postman
```

### Playwright

```sh
npm run test:pw
```