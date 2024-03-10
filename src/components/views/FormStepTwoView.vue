<script setup>
import { onBeforeMount } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import { stepTwoLogic } from '@/composable/stepTwo/logic';

const {
  handleInputChange,
  isLegalPerson,
  isNormalPerson,
  legalName,
  socialName,
  cpf,
  cnpj,
  birthDate,
  birthOpened,
  phoneLegal,
  phoneSocial,
  isLegalNameValid,
  isSocialNameValid,
  isCpfValid,
  isCnpjValid,
  isBirthDateValid,
  isBirthOpenedValid,
  isPhoneLegalValid,
  isPhoneSocialValid,
} = stepTwoLogic();

const emit = defineEmits(['stepChange', 'stepChangeBack']);

onBeforeMount(() => {
  legalName.value = localStorage.getItem('legalName') || '';
  socialName.value = localStorage.getItem('socialName') || '';
  cpf.value = localStorage.getItem('cpf') || '';
  cnpj.value = localStorage.getItem('cnpj') || '';
  birthDate.value = localStorage.getItem('birthDate') || '';
  birthOpened.value = localStorage.getItem('birthOpened') || '';
  phoneSocial.value = localStorage.getItem('phoneSocial') || '';
  phoneLegal.value = localStorage.getItem('phoneLegal') || '';
  const isLegal = localStorage.getItem('isLegalPerson');
  if (isLegal === 'false') {
    isLegalPerson.value = false;
    isNormalPerson.value = true;
  } else {
    isLegalPerson.value = true;
    isNormalPerson.value = false;
  }
});

const onSubmit = async () => {
  let requiredFields, requiredIndicators;
  if (isLegalPerson.value) {
    requiredFields = [legalName, cnpj, birthOpened, phoneLegal];
    requiredIndicators = [
      isLegalNameValid,
      isCnpjValid,
      isBirthOpenedValid,
      isPhoneLegalValid,
    ];
  } else {
    requiredFields = [socialName, cpf, birthDate, phoneSocial];
    requiredIndicators = [
      isSocialNameValid,
      isCpfValid,
      isBirthDateValid,
      isPhoneSocialValid,
    ];
  }

  const invalidFieldIndex = requiredFields.findIndex((field) => !field.value);
  if (invalidFieldIndex !== -1) {
    requiredIndicators[invalidFieldIndex].value = true;
    return;
  }

  const storageKeys = isLegalPerson.value
    ? ['legalName', 'cnpj', 'birthOpened', 'phoneLegal']
    : ['socialName', 'cpf', 'birthDate', 'phoneSocial'];
  storageKeys.forEach((key, index) => {
    localStorage.setItem(key, requiredFields[index].value);
  });

  emit('stepChange');
};
</script>

<template>
  <main class="main-container">
    <form>
      <HeaderComponent
        :step="2"
        :title="isLegalPerson ? 'Pessoa Jurídica' : 'Pessoa Física'"
      />
      <div class="step-two-container">
        <InputComponent
          :label="isLegalPerson ? 'Razão social' : 'Nome'"
          type="text"
          :id="isLegalPerson ? 'legalName' : 'socialName'"
          @input="
            (event) =>
              handleInputChange(
                event,
                isLegalPerson ? 'legalName' : 'socialName'
              )
          "
          :value="isLegalPerson ? legalName : socialName"
          :alertMessage="isLegalPerson ? 'Precisamos da razão social.' : 'Precisamos de um nome.'"
          :hasAlert="isLegalPerson ? isLegalNameValid : isSocialNameValid"
        />
        <InputComponent
          :label="isLegalPerson ? 'CNPJ' : 'CPF'"
          type="number"
          id="cnpj-cpf"
          @input="
            (event) => handleInputChange(event, isLegalPerson ? 'cnpj' : 'cpf')
          "
          :value="isLegalPerson ? cnpj : cpf"
          :alertMessage="isLegalPerson ? 'Precisamos de um CNPJ.' : 'Precisamos de um CPF.'"
          :hasAlert="isLegalPerson ? isCnpjValid : isCpfValid"
        />
        <InputComponent
          :label="isLegalPerson ? 'Data de abertura' : 'Data de nascimento'"
          type="date"
          id="date"
          @input="
            (event) =>
              handleInputChange(
                event,
                isLegalPerson ? 'birthOpened' : 'birthDate'
              )
          "
          :value="isLegalPerson ? birthOpened : birthDate"
          :alertMessage="isLegalPerson ? 'Precisamos da data de abertura da empresa.' : 'Precisamos da data de nascimento.'"
          :hasAlert="isLegalPerson ? isBirthOpenedValid : isBirthDateValid"
        />
        <InputComponent
          label="Telefone"
          type="number"
          id="phone"
          @input="
            (event) =>
              handleInputChange(
                event,
                isLegalPerson ? 'phoneLegal' : 'phoneSocial'
              )
          "
          :value="isLegalPerson ? phoneLegal : phoneSocial"
          :alertMessage="isLegalPerson ? 'Precisamos do telefone da empresa.' : 'Precisamos do telefone.'"
          :hasAlert="isLegalPerson ? isPhoneLegalValid : isPhoneSocialValid"
        />
      </div>
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
.step-two-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
