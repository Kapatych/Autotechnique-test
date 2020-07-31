<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link :to="{ name: 'RangeInput' }">Range Input</router-link>
    </div>
    <router-view />
  </div>
</template>

<style></style>
