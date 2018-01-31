import Vue from 'vue/dist/vue.min.js';  // must follow this pattery to import vuejs
import $ from 'jquery';
import utils from './utils.js';

// register a component
Vue.component('my-component', {
  template: `<div>A custom component!
              <br/>
              <br/>
              </div>`
});

// create an instance
new Vue({
  el: '#app',

  data: {
      currentActivity: 'home'
  },
  mounted:function () {
    console.log($);
    console.log(utils.trim(' ABCDEFG     '));
  }
});


