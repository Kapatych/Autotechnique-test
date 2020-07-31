<template>
  <div class="users">
    <h1>Users</h1>
    <div class="users__search search">
      <label class="field">
        <span class="field__label">Search:</span>
        <input type="text" v-model="search" class="field__input" />
      </label>
    </div>

    <p v-if="loading">Loading...</p>
    <p v-else-if="!filteredUsers.length">Users not found...</p>
    <section class="users__list" v-else>
      <UserCard v-for="user in filteredUsers" :key="user.id" :user="user" />
    </section>

    <form @submit.prevent="submitHandler" class="users__form">
      <label class="field">
        <span class="field__label">First name:</span>
        <input type="text" v-model="firstName" class="field__input" />
      </label>
      <label class="field">
        <span class="field__label">Last name:</span>
        <input type="text" v-model="lastName" class="field__input" />
      </label>
      <button type="submit" class="form__add">Add user</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "@/components/UserCard";
export default {
  name: "Home",
  data: () => ({
    search: "",
    loading: true,
    firstName: "",
    lastName: ""
  }),
  computed: {
    ...mapGetters(["users"]),
    filteredUsers() {
      return this.users.filter(user => {
        const userFullName = user.first_name + user.last_name;
        return userFullName.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    submitHandler() {
      if (this.firstName && this.lastName) {
        this.$store.dispatch("addUser", {
          first_name: this.firstName,
          last_name: this.lastName
        });
        this.firstName = "";
        this.lastName = "";
      }
    }
  },
  async mounted() {
    if (!this.users.length) {
      await this.$store.dispatch("fetchUsers");
    }
    this.loading = false;
  },
  components: { UserCard }
};
</script>

<style scoped>
.users__search {
  margin-top: 25px;
}
.users__list {
  margin-top: 25px;
}
.users__form {
}
.field {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}
.field__label {
  margin-bottom: 5px;
}
.field__input {
  height: 36px;
  padding: 0 16px;
  border-radius: 4px;
  border: 1px solid #717773;
}
.form__add {
  margin: 15px auto 0;
  display: block;
  border: 0;
  border-radius: 4px;
  background: #3949ab;
  color: #ffffff;
  min-width: 75px;
  padding: 0 16px;
  height: 36px;
  cursor: pointer;
}
</style>
