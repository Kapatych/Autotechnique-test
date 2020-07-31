<template>
  <div class="range">
    <h1>Range Input</h1>
    <div class="container">
      <RangeInput v-model="rangeValue" />
    </div>
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
.range {
  max-width: 600px;
  margin: 0 auto;
}
</style>
