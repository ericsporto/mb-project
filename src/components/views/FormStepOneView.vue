<script setup>
import { onBeforeMount } from 'vue';
import ButtonComponent from '../ButtonComponent.vue';
import HeaderComponent from '../HeaderComponent.vue';
import InputComponent from '../InputComponent.vue';
import SpanComponent from '../SpanComponent.vue';
import {stepOneLogic} from '../../composable/stepOne/logic';

const {
  email,
  handleInputChange,
  isEmailValid,
  normalPersonChecked,
  handleCheckboxChange,
  legalPersonChecked,
  isCheckboxValid,
} = stepOneLogic();

const emit = defineEmits(['stepChange']);

onBeforeMount(() => {
  const savedEmail = localStorage.getItem('email');
  const savedIsLegalPerson = localStorage.getItem('isLegalPerson');

  if (savedEmail) {
    email.value = savedEmail;
  }

  if (savedIsLegalPerson === 'true') {
    legalPersonChecked.value = true;
  } else if (savedIsLegalPerson === 'false') {
    normalPersonChecked.value = true;
  }
});

const onSubmit = async () => {
  if (!email.value) {
    isEmailValid.value = true;
    return;
  }
  if (!normalPersonChecked.value && !legalPersonChecked.value) {
    isCheckboxValid.value = true;
    return;
  }
  localStorage.setItem('email', email.value);
  localStorage.setItem('isLegalPerson', legalPersonChecked.value);
  localStorage.setItem('isNormalPerson', normalPersonChecked.value);
  emit('stepChange');
};
</script>

<template>
  <main class="main-container">
    <HeaderComponent :step="1" title="Seja bem vindo(a)" />
    <InputComponent
      label="Endereço de e-mail"
      type="email"
      id="email"
      @input="handleInputChange"
      :value="email"
      alertMessage="Precisamos de um e-mail."
      :hasAlert="isEmailValid"
    />
    <div class="checkbox-wrapper">
      <InputComponent
        label="Pessoa física"
        type="checkbox"
        id="normal-person"
        :checked="normalPersonChecked"
        @change="() => handleCheckboxChange('normal')"
      />
      <InputComponent
        label="Pessoa jurídica"
        type="checkbox"
        id="legal-person"
        :checked="legalPersonChecked"
        @change="() => handleCheckboxChange('legal')"
      />
    </div>
    <SpanComponent v-if="isCheckboxValid" message="Precisamos de uma escolha." />
    <div class="button-container">
      <ButtonComponent
        @click="onSubmit"
        label="Continuar"
        variant="primary"
        type="button"
      />
    </div>
  </main>
</template>

<style scoped>
.checkbox-wrapper {
  display: flex;
  padding: 20px 0 3px 0;
}
</style>
