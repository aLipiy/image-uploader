<template>
  <button @click.prevent="action()" class="btn">{{ buttonText }}</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CommonButton",
  props: {
    buttonText: String,
    action: Function
  }
});
</script>

<style scoped lang="scss">
.btn {
  background: #2f80ed;
  border-radius: 8px;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: -0.035em;
  color: #ffffff;
  padding: 8px 16px;
  &:hover {
    cursor: pointer;
  }
}
</style>
