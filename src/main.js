import Vue from 'vue';
import PaginaCarregando from '@/components/PaginaCarregando.vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.component('PaginaCarregando', PaginaCarregando);
Vue.use(VueRouter);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
