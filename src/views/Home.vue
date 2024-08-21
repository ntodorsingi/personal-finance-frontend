<template>
  <div class="home">
    <div class="home-container">
      <h1>Welcome to Your Personal Finance Tracker</h1>
      <p>Your account overview is ready. Start managing your finances now!</p>
      <div class="welcome-box">
        <h2>Current Overview</h2>
        <p>No accounts found. Please add some accounts to get started.</p>
      </div>
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
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e0f7fa;
}

.home-container {
  max-width: 500px;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
  color: #555;
}

.welcome-box {
  background-color: #e0f7fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.welcome-box h2 {
  font-size: 20px;
  margin-top: 0;
  color: #00796b;
}

.welcome-box p {
  font-size: 16px;
  color: #00796b;
}
</style>
