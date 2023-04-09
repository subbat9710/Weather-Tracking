<template>
    <div class="user-icon" @click="showUserInfo">
      <i class="fa-solid fa-user fa-2x"></i>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserIcon",
    methods: {
      showUserInfo() {
        const token = this.$store.state.token;
        const username = this.$store.state.user.username;
        alert(`Username: ${username}\nToken: ${token}`);
      },
      logout() {
      this.$store.dispatch('logout');
      this.$emit('logout');
    }
  }
};
  </script>
  
  <style scoped>
  .user-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
  }
  </style>
  