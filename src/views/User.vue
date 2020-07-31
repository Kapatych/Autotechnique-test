<template>
  <div class="user">
    <h1>{{ user.first_name }} {{ user.last_name }}</h1>
    <button type="button" @click="backHandler">Back</button>
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
    backHandler() {
      this.$router.history.push({ name: "Users" });
    }
  }
};
</script>
