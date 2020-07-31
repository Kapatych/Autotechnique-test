<template>
  <div id="app">
    <div class="container">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link :to="{ name: 'Users' }">Users List</router-link> |
        <router-link :to="{ name: 'RangeInput' }">Range Input</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 680px;
  min-width: 320px;
  margin: 0 auto;
}
</style>
