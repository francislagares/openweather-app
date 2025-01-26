# OpenWeather App

A modern weather application built with Next.js, TypeScript, Zustand, and React Query.

## Features
- Search for current weather conditions by city.
- Fetches and displays weather forecasts using OpenWeather API.
- Caches search results for improved performance.
- Displays weather details including temperature, wind speed, and humidity.
- Supports switching between Celsius and Fahrenheit.
- Fetches current location's weather using geolocation.

## Tech Stack
- **Next.js**: UI development
- **TypeScript**: Strongly typed JavaScript
- **Zustand**: State management
- **React Query**: Data fetching and caching
- **Axios**: HTTP requests
- **Tailwind CSS**: Styling

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/francislagares/openweather-app.git
   cd weather-app
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Create an `.env` file and add OpenWeather API url and key :
   ```sh
   NEXT_PUBLIC_OPEN_WEATHER_API_KEY=
   NEXT_PUBLIC_OPEN_WEATHER_API_BASE_URL=
   ```
4. Start the development server:
   ```sh
   pnpm dev
   ```

## Usage
- Enter a city name in the search bar to get weather details.
- Click on the location icon to fetch the weather for your current location.
- Weather data is cached to prevent unnecessary API calls.

## Run Tests

- Just run the following command:
   ```sh
   pnpm test:ci
   ```

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.
