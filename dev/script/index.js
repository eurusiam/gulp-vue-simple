import Vue from 'vue/dist/vue.js';
import $ from 'jquery/dist/jquery.js';

// register a component
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
});

// create an instance
new Vue({
  el: '#app',
  data: {
      currentActivity: 'home'
  },
  mounted:function () {
    console.log($);
  }
});


