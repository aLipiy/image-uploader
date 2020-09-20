<template>
  <div class="card-wrapper">
    <div class="title">Uploading...</div>
    <div class="loader">
      <div class="loader-thumb"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loading",
  props: {
    loading: {
      type: Boolean
    }
  }
});
</script>

<style scoped lang="scss">
.card-wrapper {
  background: #fafafb;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 36px 32px;
  width: var(--loaderwidth);
  .title {
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.035em;
    color: #4f4f4f;
    margin-bottom: 30px;
  }
}
.loader {
  background: #f2f2f2;
  border-radius: 8px;
  height: 6px;
  position: relative;
  overflow: hidden;
}
.loader-thumb {
  position: absolute;
  top: 0;
  width: 100px;
  height: 6px;
  background: #2f80ed;
  border-radius: 8px;
  animation: 1.5s ease-out 0s infinite normal both running loading;
}
@keyframes loading {
  0% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(calc(calc(var(--loaderwidth) - 32px) + 100px));
  }
}
</style>
