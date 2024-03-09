<script setup></script>
<template>
  <div class="spinner">
    <div class="spinner-inner" />
  </div>
</template>

<style scoped>
.spinner {
  width: 23px;
  height: 23px;
  position: relative;
  margin: 0 auto;
  margin-bottom: 4px;
}

.spinner-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #ffffff;
  border-left-color: #ffffff;
  border-right-color: #ffffff;
  animation: spin 1s linear infinite;

}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
