// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// State
// const [apiData, setApiData] = useState({});
// const [getState, setGetState] = useState('tamilnadu');
// const [state, setState] = useState('tamilnadu');

// const apiKey = process.env.APP_API_KEY;
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
