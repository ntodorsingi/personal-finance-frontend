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
import axios from 'axios'; // Koristi standardnu instancu Axios

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

      // Validacija forme
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
          // Zameni `api.post` sa direktnim `axios.post`
          await axios.post('http://localhost:3000/api/register', {
            username: form.value.username,
            email: form.value.email,
            password: form.value.password,
            currency: 'USD'
          });
          alert('Registration successful!');
          // Redirect to login or other page
          // this.$router.push('/login'); // Ako koristiš Vue Router za navigaciju
        } catch (error) {
          console.error('Error registering user:', error);
          alert('Registration failed. Please try again.');
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
.register-container {
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

.login-link {
  margin-top: 20px;
  text-align: center;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
