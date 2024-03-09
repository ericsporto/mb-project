<script setup lang="js">

defineProps({
  label: String,
  variant: 'primary' | 'secondary',
  type: String,
})
</script>

<template>
  <button :type="type" :class="variant === 'primary' ? 'primary' : 'secondary'">
    {{ label }}
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 100%;
  cursor: pointer;
}
.primary {
  background-color: #ff9900;
  color: #ffffff;
  font-weight: 500;
  border: none;
  border-radius: 5px;
}
.primary:hover {
  background-color: #d78c1b;
  transition: ease-in-out 0.2s;
}
.secondary {
  background-color: #ffffff;
  color: #ff9900;
  font-weight: 500;
  border: 1px solid #ff9900;
  border-radius: 5px;
}
.secondary:hover {
  background-color: #f4f4f4;
  transition: ease-in-out 0.2s;
}
</style>
