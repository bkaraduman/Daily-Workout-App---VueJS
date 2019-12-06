import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/pages/Home';
import NewWorkout from '../components/pages/NewWorkout';
import Auth from "../components/pages/auth/Auth"
import Register from '../components/pages/auth/Register'
import MyWorkouts from '../components/pages/MyWorkouts'

Vue.use(Router);


export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/', component: Home
        },
        {
            path: '/login', component: Auth
        },
        {
            path: '/register', component: Register
        },
        {
            path: '/yeni-antrenman', component: NewWorkout
        },
        {
            path: '/antrenmanlarim', component: MyWorkouts
        }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register','/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');
  
    if (authRequired && !loggedIn) {
      return next('/login');
    }
  
    next();
  })

export default router;