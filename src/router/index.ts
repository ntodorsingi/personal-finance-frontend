import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import AccountDetails from '../views/AccountDetails.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import UserStatus from '../views/UserStatus.vue'; // Putanja do UserStatus.vue u views

const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: Dashboard },
  { path: '/account/:id', component: AccountDetails },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/user-status', component: UserStatus } // Dodajte rutu za UserStatus
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
