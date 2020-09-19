<template>
  <div>{{ loadingValue }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loading",
  props: {
    loading: {
      type: Boolean
    },
    loadingValue: {
      type: Number
    }
  }
});
</script>

<style scoped lang="scss"></style>
