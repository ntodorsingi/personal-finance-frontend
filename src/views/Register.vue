<template>
  <div class="register-container">
    <h2>Create an Account</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="form.username" />
        <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" />
        <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" />
        <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="form.confirmPassword" />
        <div v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</div>
      </div>
      <button type="submit" class="submit-button">Register</button>
    </form>
    <p class="login-link">
      Already have an account? <router-link to="/login">Login here</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';  // Import Axios

export default defineComponent({
  name: 'Register',
  setup() {
    const form = ref({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    const errors = ref({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    const handleRegister = async () => {
      errors.value = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      };

      if (!form.value.username) {
        errors.value.username = 'Username is required.';
      }
      if (!form.value.email) {
        errors.value.email = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
        errors.value.email = 'Email must be a valid email address.';
      }
      if (!form.value.password) {
        errors.value.password = 'Password is required.';
      }
      if (form.value.password !== form.value.confirmPassword) {
        errors.value.confirmPassword = 'Passwords do not match.';
      }

      if (Object.values(errors.value).every(error => !error)) {
        try {
          const response = await axios.post('http://localhost:3000/register', {
            username: form.value.username,
            email: form.value.email,
            password: form.value.password
          });
          console.log('Registration successful:', response.data);
          // Redirect to login or home page
        } catch (error) {
          console.error('There was an error during registration:', error);
        }
      }
    };

    return {
      form,
      errors,
      handleRegister
    };
  }
});
</script>

<style scoped>
/* Your existing styles here */
</style>
