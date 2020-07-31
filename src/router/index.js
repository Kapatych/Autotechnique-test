import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/Users.vue")
  },
  {
    path: "/users/:id",
    name: "User",
    props: true,
    component: () => import("../views/User.vue"),
    beforeEnter(to, from, next) {
      store
        .dispatch("getUserById", to.params.id)
        .then(user => {
          if (user) {
            to.params.user = user;
            next();
          } else {
            next({ name: "Users" });
          }
        })
        .catch(e => console.log(e + "No such user"));
    }
  },
  {
    path: "/range-input",
    name: "RangeInput",
    component: () => import("../views/RangeInput.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
