window.onload = function () {
  var main = new Vue({
    el: 'main',
    data: {
      currentActivity: 'home',
      number: 666
    }
  });
}

Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})