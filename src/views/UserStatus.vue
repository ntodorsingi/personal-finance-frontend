<template>
    <div class="user-status">
      <h2>Welcome, {{ user.username }}!</h2>
      <p>Your balance: ${{ user.balance }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    name: 'UserStatus',
    setup() {
      const user = ref({
        username: '',
        balance: 0
      });
  
      const fetchUserStatus = async () => {
        const token = localStorage.getItem('jwt');
        if (!token) {
          window.location.href = '/login'; // Redirect to login if no token is found
          return;
        }
  
        try {
          const response = await axios.get('http://localhost:3000/api/user-status', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          user.value = response.data;
        } catch (error) {
          console.error('Error fetching user status:', error);
          alert('An error occurred while fetching user status.');
        }
      };
  
      onMounted(() => {
        fetchUserStatus();
      });
  
      return {
        user
      };
    }
  });
  </script>
  
  <style scoped>
  .user-status {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }
  
  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  
  p {
    font-size: 18px;
    color: #555;
  }
  </style>
  