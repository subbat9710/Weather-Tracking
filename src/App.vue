<template>
  <div id="app">
    <div id="nav" v-if="$route.name !== 'login' && $route.name !== 'register'">
      <div class="nav-left">
        <router-link v-bind:to="{ name: 'home' }"><i class="fa-solid fa-house fa-2xl" style="margin: 10px;"></i></router-link>
      </div>
      <div class="nav-middle" v-if="$route.name === 'home'">
        <h1>Welcome, {{ username }}</h1>
      </div>
      <div class="nav-right">
        <button class="user-toggle" @click="showUser = !showUser" v-if="$route.name === 'home'"><i class="fa-solid fa-user fa-2xl"></i></button>
        <!-- <router-link v-bind:to="{ name: 'logout' }" v-if="$route.name === 'home'"><i class="fa-solid fa-right-from-bracket fa-2xl"></i></router-link> -->
        <div class="user-info" v-show="showUser">
          <p><strong>Username:</strong> {{ $store.state.user.username }}</p>
          <p><strong>Role:</strong> {{ $store.state.user.role }}</p>
          <div class="token-container">
            <p><strong>Token:</strong></p>
            <textarea readonly v-model="$store.state.token"></textarea>
          </div>
          <button class="logout-button" @click="logout">Logout</button>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      showUser: false
    };
  },
  computed: {
    username() {
      return this.$store.state.user.username;
    }
  },
  methods: {
    logout() {
      // Perform logout actions here
      this.$router.push({ name: "login" });
      this.showUser = false;
    }
  }
};
</script>

<style>
#app {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  height: 100vh;
  position: relative; 
}

#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  height: 60px;
  padding: 0 20px;
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1; /*create a stacking order */
}

.nav-left {
  flex: 1;
  text-align: left;
}
.fa-house {
  color: white;
}
.nav-middle {
  flex: 1;
  text-align: center;
}
.nav-right {
  flex: 1;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.user-toggle {
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
}
.user-info {
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #fff;
  color: #333;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 300px;
}
.user-info p {
  text-align: left;
}
.token-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.token-container textarea {
  width: 100%;
  height: 150px;
  margin-top: 5px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  resize: none;
}
.logout-button {
  background-color: rgb(34, 155, 34);
  font-weight: bold;
}
</style>
