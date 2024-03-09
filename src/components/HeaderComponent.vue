<script setup lang="js">
defineProps({
    step: Number,
    title: String
})
</script>

<template>
  <div class="wrapper">
    <h3>
      Etapa <span class="span">{{ step }}</span> de 4
    </h3>
    <h1>{{ title }}</h1>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  padding-bottom: 30px;
}

.span{
    color: #FF9900
}
</style>
