<script setup lang="js">
import {ref, onBeforeMount} from 'vue'
import ButtonComponent from '../ButtonComponent.vue';
import HeaderComponent from '../HeaderComponent.vue';
import InputComponent from '../InputComponent.vue';

const emit = defineEmits(['stepChange', 'stepChangeBack']);
const password = ref('')
const isPasswordValid = ref(false)

onBeforeMount(() => {
password.value = localStorage.getItem('password') || ''
});

const handleInputChange = (event) => {
  password.value = event.target.value;
};

const onSubmit = async () => {
  if (!password.value) {
    isPasswordValid.value = true;
    return;
  }
  localStorage.setItem('password', password.value)
  emit('stepChange');
};
</script>

<template>
  <main class="main-container">
    <form>
      <HeaderComponent :step="3" title="Senha de acesso" />
      <InputComponent
        label="Sua senha"
        type="text"
        :required="false"
        id="password"
        @input="handleInputChange"
        :value="password"
        alertMessage="This field is required."
        :hasAlert="isPasswordValid"
      />
      <div class="button-container">
        <ButtonComponent
          @click="$emit('stepChangeBack')"
          label="Voltar"
          variant="secondary"
          type="button"
        />
        <ButtonComponent
          @click="onSubmit"
          label="Continuar"
          variant="primary"
          type="button"
        />
      </div>
    </form>
  </main>
</template>

<style scoped>
.checkbox-wrapper {
  display: flex;
  padding: 20px 0 3px 0;
}
</style>
