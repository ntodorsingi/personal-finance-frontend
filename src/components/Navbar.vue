<template>
    <nav>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
      <router-link to="/account/1" class="nav-link">Account Details</router-link> <!-- Primer sa ID-om računa -->
      <router-link to="/login" class="nav-link">Login</router-link>
      <router-link to="/register" class="nav-link">Register</router-link>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Navbar'
  });
  </script>
  
  <style scoped>
  nav {
    background-color: #333;
    padding: 10px;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    margin: 0 15px;
    font-weight: bold;
  }
  
  .nav-link:hover {
    text-decoration: underline;
  }
  </style>
  