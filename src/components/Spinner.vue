<template>
  <div class="spin-wrapper">
    <div class="spin"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoadingSpinner',
});
</script>

<style>
.spin-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  height: 100vh;
  width: 100vw;
}

.spin {
  position: absolute;
  display: block;
  margin: 300px calc(50% - 20px);
  width: 40px;
  height: 40px;
  border: 4px solid transparent;
  border-radius: 50%;
  border-top-color: orange;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}
</style>
