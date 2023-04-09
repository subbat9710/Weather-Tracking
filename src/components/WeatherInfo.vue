<template>
    <div>
    <p><strong>Location:</strong> {{ weatherData.locationName }}, {{ weatherData.country }}</p>
    <p><strong>Temperature:</strong> {{ weatherData.temp_f }} °F</p>
    <p><strong>Date and Time:</strong> {{ weatherData.localTime }}</p>
    <p><strong>Forecast:</strong> {{ weatherData.text }}</p>
    <p><strong>Humidity:</strong> {{ weatherData.humidity }}</p>
    <img :src="weatherData.icon" alt="Weather Icon">
    </div>
  </template>
  
  <script>
  export default {
    name: 'WeatherDisplay',
    props: {
      weatherData: {
        type: Object,
        required: true
      }
    }
  };
  </script>

<style>
</style>