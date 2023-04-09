<template>
  <div class="home" :style="{ backgroundImage: backgroundImage }">
    <div v-show="!isLoading">
      <div class="search" v-if="!isLoading">
        <input type="text" placeholder="Enter a location" v-model="searchText" required/>
          <button @click="searchWeatherData">Search</button>
        </div>
      </div>
      <WeatherInfo v-if="!isLoading" :weatherData="weatherData" />
      <div v-else class="loading-indicator">
      <img src="https://usagif.com/wp-content/uploads/loading-23.gif.webp" alt="Loading..." />
    </div>
  </div>
</template>

<script>
import WeatherInfo from '@/components/WeatherInfo.vue';
import axios from 'axios';

export default {
  name: "home",
  components: {
    WeatherInfo
  },
  data() {
    return {
      weatherData: {},
      backgroundImage: '',
      searchText: '',
      isLoading: false
    };
  },
  mounted() {
    this.loadWeatherData();
  },
  methods: {
     loadWeatherData() {
      this.isLoading = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getWeatherDataFromCoords, this.getWeatherDataFromDefaultLocation);
      } else {
        // If geolocation is not supported, use default location
        this.getWeatherDataFromDefaultLocation();
      }
    },
    getWeatherDataFromCoords(position) {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
      axios.get(url)
        .then(response => {
          const locationName = response.data.address.city || response.data.address.town || response.data.address.village || response.data.address.hamlet || response.data.address.county;
          axios.get(`/api/weather/${locationName}`)
            .then(response => {
              this.weatherData = response.data;
              this.updateBackground();
              this.isLoading = false;
            })
            .catch(error => {
              console.log(error);
              this.isLoading = false;
            });
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        });
    },
    getWeatherDataFromDefaultLocation() {
      // Get the weather data using the default location
      axios.get('/api/weather/pittsburgh')
        .then(response => {
          this.weatherData = response.data;
          this.updateBackground();
          this.isLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        });
    },
searchWeatherData() {
  if (this.searchText) {
    this.isLoading = true;
    axios
      .get(`/api/weather/${this.searchText}`)
      .then(response => {
        this.weatherData = response.data;
        this.updateBackground(); // call updateBackground to update the background image
        this.searchText = '';
        this.isLoading = false;
      })
      .catch(error => {
        console.log(error);
        this.isLoading = false;
      });
  }
},
updateBackground() {
  if (this.weatherData && this.weatherData.text) {
    const weatherCondition = this.weatherData.text.toLowerCase();

    switch (weatherCondition) {
      case 'partly cloudy':
        this.backgroundImage = "url('https://thumbs.gfycat.com/DeadlyEmotionalArcherfish-size_restricted.gif')";
        break;
      case 'sunny':
        this.backgroundImage = "url('https://64.media.tumblr.com/c4205bb1f4230f38c8e79b49055a9c67/b4d4f2e5ea6f4d8e-78/s640x960/a14a1b8f48c5d728c499c6ca9f2922003866bb63.gif')";
        break;
      case 'light rain':
        this.backgroundImage = "url('https://www.icegif.com/wp-content/uploads/rain-icegif-1.gif')";
        break;
      case 'clear':
        this.backgroundImage = "url('https://thumbs.gfycat.com/ForcefulSpiffyAppaloosa-max-1mb.gif')";
        break;
        case 'raining':
        this.backgroundImage = "url('https://gifdb.com/images/high/aesthetic-anime-heavy-rain-splash-jeajbmb2ohg1x7z3.gif')";
        break;
        case 'thunder strom':
        this.backgroundImage = "url('https://media3.giphy.com/media/FZzbTJyRTwPuw/giphy.gif')";
        break;
        case 'overcast':
        this.backgroundImage = "url('https://www.adventurebikerider.com/wp-content/uploads/2017/10/tumblr_o27c7fByaO1tchrkco1_500.gif')";
        break;
        case 'light snow':
        this.backgroundImage = "url('https://media.tenor.com/UQcABowZjPIAAAAC/snow-snowing.gif')";
        break;
        case 'heavy snow':
        this.backgroundImage = "url('https://media.tenor.com/twR0LCb2RgkAAAAM/moon-winter.gif')";
        break;
        case 'mist':
        this.backgroundImage = "url('https://i.gifer.com/CKtq.gif')";
        break;
        case 'fog':
        this.backgroundImage = "url('https://imageresizer.static9.net.au/bFAAnuFoboPhJz30cM5TR0ia7ls=/360x203/https%3A%2F%2Fprod.static9.net.au%2Ffs%2F06a47928-bcab-4364-bf17-e2b1021f446a')";
        break;
        case 'patchy rain possible':
        this.backgroundImage = "url('https://64.media.tumblr.com/ccffe7fe87cffe475a16916afecf2570/fbeddcbc3b13643b-47/s540x810/fb4ec14a0aa57a9b7f09b13bafd5083acd666480.gif')";
        break;
      default:
        this.backgroundImage = "url('https://64.media.tumblr.com/ccffe7fe87cffe475a16916afecf2570/fbeddcbc3b13643b-47/s540x810/fb4ec14a0aa57a9b7f09b13bafd5083acd666480.gif')";
        break;
    }
  }
}}
};
</script>

<style>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  position: relative;
}
.home .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.search input, .search button {
  background: transparent;
  border: 1px solid transparent;
  border-color: black;
  outline: none;
  color: #080505;
}
</style>