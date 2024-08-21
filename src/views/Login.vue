<template>
  <div class="login-container">
    <h2>Login to Your Account</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="form.username" />
        <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" />
        <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
      </div>
      <button type="submit" class="submit-button">Login</button>
    </form>
    <p class="register-link">
      Don't have an account? <router-link to="/register">Register here</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { findUserByUsername } from '../utils/mockDataBase';

export default defineComponent({
  name: 'Login',
  setup() {
    const form = ref({
      username: '',
      password: ''
    });

    const errors = ref({
      username: '',
      password: ''
    });

    const handleLogin = () => {
      errors.value = {
        username: '',
        password: ''
      };

      if (!form.value.username) {
        errors.value.username = 'Username is required.';
      }
      if (!form.value.password) {
        errors.value.password = 'Password is required.';
      }

      if (Object.values(errors.value).every(error => !error)) {
        const user = findUserByUsername(form.value.username);
        if (user && user.password === form.value.password) {
          alert('Login successful!');
          // Implement further actions like redirecting the user
        } else {
          errors.value.password = 'Invalid username or password.';
        }
      }
    };

    return {
      form,
      errors,
      handleLogin
    };
  }
});
</script>

<style scoped>
.login-container {
  max-width: 500px;
  margin: auto;
  padding: 30px;
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

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.error-message {
  color: #ff4d4d;
  font-size: 14px;
  margin-top: 5px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

.register-link {
  margin-top: 20px;
  text-align: center;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
