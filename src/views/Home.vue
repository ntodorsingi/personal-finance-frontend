<template>
  <div class="home">
    <h1>Welcome to Your Personal Finance Tracker</h1>
    <p>Your account overview is ready. Start managing your finances now!</p>
    <div class="welcome-box">
      <h2>Current Overview</h2>
      <p>No accounts found. Please add some accounts to get started.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // Data can be added here later if needed
    };
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #e0f7fa;
  color: #00796b;
  text-align: center;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
}

.welcome-box {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 80%;
  max-width: 400px;
  margin-top: 20px;
}

.welcome-box h2 {
  margin-top: 0;
  font-size: 1.5em;
  color: #004d40;
}

.welcome-box p {
  color: #004d40;
}
</style>
