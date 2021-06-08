<template>
  <div class="app">
    <div class="card">
      <UsersComponent :propUser="users" />
    </div>
  </div>
</template>

<script>
import UsersComponent from './components/Users.vue';
import UsersService from './service/UsersService';

export default {
  name: 'App',
  components: {
    UsersComponent
  },
  data() {
    return {
      users: null
    };
  },
  usersService: null,
  created() {
    this.usersService = new UsersService();
  },
  mounted() {
    this.usersService.getUsers().then((data) => (this.users = data));
  }
};
</script>
<style scoped>
.app {
  padding: 2% 15%;
  background: #f8f9fa;
}
</style>
