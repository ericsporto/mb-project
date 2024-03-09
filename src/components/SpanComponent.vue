<script setup lang="js">
defineProps({
    message: String,
})
</script>

<template>
  <span class="alert-span">
    {{ message }}
  </span>
</template>

<style scoped>
.alert-span {
  font-size: 12px;
  font-weight: 700;
  color: red;
}

</style>

