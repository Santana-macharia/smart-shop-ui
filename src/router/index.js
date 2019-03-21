import Vue from 'vue';
import Router from 'vue-router';
import Login from '../auth/Login';
import Main from '../site/Main';
import site_routes from '../site/routes';
import maps from '../maps/maps';




Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/maps',
      name: 'maps',
      component: maps,
    },
    {

      path: '/',
      component: Main,
      children: site_routes,
    },
   
    
  ],
});
