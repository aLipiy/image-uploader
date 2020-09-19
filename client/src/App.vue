<template>
  <div class="container" @drop.prevent @dragover.prevent>
    <upload-card />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UploadCard from "@/components/UploadCard.vue";

export default defineComponent({
  name: "App",
  components: { UploadCard }
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  background: #fafafb;
}
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  font-family: "Poppins", sans-serif;
  border: none;
  &:focus {
    outline: none;
  }
}
img {
  display: block;
  height: 100%;
  object-fit: cover;
}
</style>
