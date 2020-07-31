<template>
  <div class="range">
    <h1>Range Input</h1>
    <RangeInput v-model="rangeValue" />
  </div>
</template>

<script>
import RangeInput from "@/components/RangeInput";
export default {
  data: () => ({
    rangeValue: 0
  }),
  components: { RangeInput }
};
</script>

<style scoped>
</style>
