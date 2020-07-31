<template>
  <div class="user">
    <router-link :to="{ name: 'User', params: { id: user.id } }">
      {{ user.first_name }} {{ user.last_name }}
    </router-link>
    <button type="button" @click="removeHandler" class="user__remove">
      Delete
    </button>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeHandler() {
      this.$store.dispatch("removeUser", this.user.id);
    }
  }
};
</script>

<style scoped>
.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
.user__remove {
  border: 0;
  padding: 5px 10px;
  background: #d32f2f;
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;
}
</style>
