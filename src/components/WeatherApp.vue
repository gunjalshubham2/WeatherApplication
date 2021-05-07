<template>
  <div>
    <div>
      <h1>{{ msg }}</h1>
      <h2 v-if="!latitude && !longitude">Please wait for a moment we're fetching your location details to display weather report</h2>
      <h3 v-else>Enter any location details to find weather condition:</h3>
      <div v-if="!latitude && !longitude">
        <img src="../assets/Preloader_1.gif">
      </div>
      <div v-else>
        <label>Latitude: </label>
        <input v-model="latitude" />
        <br />
        <br />
        <label>Longitude:</label>
        <input v-model="longitude" />
        <br />
        <br />
        <button type="text" @click="getWeatherInfo(latitude, longitude)">
          Search
        </button>
      </div>
    </div>
    <br />
    <br />
    <div v-if="isShowWeatherInfo">
      Click Here:
      <p v-if="error">Error: {{error}}</p>
      <button class="btn-pointer" type="text" @click="showCurrentWeatherReport()">Current Weather Report</button>
      <button class="btn-pointer" type="text" @click="showHourlyWeatherReport()">Hourly Weather Report</button>
      <button class="btn-pointer" type="text" @click="showDailyWeatherReport()">Daily Weather Report</button>
      <br />
      <br />
      <div class="row">
        <div v-if="showCurrentWeatherInfo" class="column">
          <div class="card">
            <h3>Current Weather Info for 1 Hour</h3>
            <p>Temperature: {{current.temp}}</p>
            <p>Condition: {{current.weather[0].main}}</p>
          </div>
        </div>
        <div v-if="showHourlyWeatherInfo" class="column">
          <div v-for="(field, index) in hourly" :key="index" class="card">
            <h3>Hourly Weather Info for 48 Hours</h3>
            <p>Temperature: {{field.temp}}</p>
            <p>Condition: {{field.weather[0].main}}</p>
          </div>
        </div>
        <div v-if="showDailyWeatherInfo" class="column">
          <div v-for="(field, index) in daily" :key="index" class="card">
            <h3>Daily Weather Info for 7 Days</h3>
            <p>High Temperature: {{field.temp.max}}</p>
            <p>Low Temperature: {{field.temp.min}}</p>
            <p>Condition: {{field.weather[0].main}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <img src="../assets/Preloader_2.gif">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'WeatherApp',
  data () {
    return {
      msg: 'Welcome to our Vue.js based Weather App',
      error: '',
      latitude: '', // for storing latitude
      longitude: '', // for storing longitude
      isShowWeatherInfo: false,
      showCurrentWeatherInfo: true, // by default one report should be present on the screen
      showDailyWeatherInfo: false,
      showHourlyWeatherInfo: false,
      current: {},
      daily: [],
      hourly: []
    }
  },
  mounted () {
    if (localStorage.getItem('latitude') && localStorage.getItem('longitude')) {
      this.latitude = JSON.parse(localStorage.getItem('latitude'))
      this.longitude = JSON.parse(localStorage.getItem('longitude'))
      this.getWeatherInfo(this.latitude, this.longitude)
    } else {
      this.getGeoLocation()
    }
  },
  methods: {
    getGeoLocation: function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showCurrentPosition)
      } else {
        this.error = 'Geo-location is not supported.'
      }
    },
    showCurrentPosition: function (position) {
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      this.getWeatherInfo(this.latitude, this.longitude)
    },
    async getWeatherInfo (latitude, longitude) {
      try {
        localStorage.setItem('latitude', latitude)
        localStorage.setItem('longitude', longitude)
        this.isShowWeatherInfo = false
        const result = await axios({
          method: 'GET',
          url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.APP_API_KEY}`,
          json: true
        })
        this.current = result.data.current
        this.daily = result.data.daily
        this.hourly = result.data.hourly
        this.isShowWeatherInfo = true
      } catch (error) {
        this.isShowWeatherInfo = false
      }
    },
    showCurrentWeatherReport () {
      this.showDailyWeatherInfo = false
      this.showHourlyWeatherInfo = false
      this.showCurrentWeatherInfo = true
    },
    showDailyWeatherReport () {
      this.showCurrentWeatherInfo = false
      this.showHourlyWeatherInfo = false
      this.showDailyWeatherInfo = true
    },
    showHourlyWeatherReport () {
      this.showCurrentWeatherInfo = false
      this.showDailyWeatherInfo = false
      this.showHourlyWeatherInfo = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}

.column {
  float: left;
  width: 100%;
  padding: 0 10px;
}

/* Remove extra left and right margins, due to padding */
.row {margin: auto}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive columns */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}

/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  text-align: center;
  background-color: #f1f1f1;
}

.btn-pointer {
  cursor: pointer;
}
</style>
