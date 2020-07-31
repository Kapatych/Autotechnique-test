import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    setUsers: (state, payload) => {
      state.users = payload;
    },
    addUser: (state, payload) => {
      state.users.push(payload);
    },
    removeUser: (state, payload) => {
      state.users = state.users.filter(user => user.id !== payload);
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await fetch("https://reqres.in/api/users");
        const commits = await response.json();
        // console.log(commits);
        commit("setUsers", commits.data);
      } catch (e) {
        console.log(e);
      }
    },
    getUserById({ getters }, id) {
      return getters.getUserById(id);
    },
    addUser({ commit, getters }, { first_name, last_name }) {
      commit("addUser", { id: getters.usersCount + 1, first_name, last_name });
    },
    removeUser({ commit }, id) {
      commit("removeUser", id);
    }
  },
  getters: {
    users: state => state.users,
    usersCount: state => state.users.length,
    getUserById: state => id => state.users.find(user => user.id === id)
  }
});
