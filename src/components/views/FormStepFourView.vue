<script setup>
import { onBeforeMount } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import ButtonSpinnerComponent from '@/components/ButtonSpinnerComponent.vue';
import { stepFourLogic } from '../../composable/stepFour/logic';
import handleGetRegister from '@/requests/getRegister';
import handleRegisterSocial from '@/requests/registerSocial';
import handleRegisterLegal from '@/requests/registerLegal';

const {
  handleInputChange,
  isLegalPerson,
  isNormalPerson,
  legalName,
  socialName,
  cpf,
  cnpj,
  email,
  password,
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
  isPasswordValid,
  isEmailValid,
  isLoading,
} = stepFourLogic();

const emit = defineEmits(['stepChange', 'stepChangeBack']);

onBeforeMount(() => {
  password.value = localStorage.getItem('password') || '';
  email.value = localStorage.getItem('email') || '';
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
    requiredFields = [
      legalName,
      cnpj,
      birthOpened,
      phoneLegal,
      email,
      password,
    ];
    requiredIndicators = [
      isLegalNameValid,
      isCnpjValid,
      isBirthOpenedValid,
      isPhoneLegalValid,
      isEmailValid,
      isPasswordValid,
    ];
  } else {
    requiredFields = [socialName, cpf, birthDate, phoneSocial, email, password];
    requiredIndicators = [
      isSocialNameValid,
      isCpfValid,
      isBirthDateValid,
      isPhoneSocialValid,
      isEmailValid,
      isPasswordValid,
    ];
  }

  const invalidFieldIndex = requiredFields.findIndex((field) => !field.value);
  if (invalidFieldIndex !== -1) {
    requiredIndicators[invalidFieldIndex].value = true;
    return;
  }

  isLoading.value = true;

  setTimeout(async () => {
    try {
      if (isLegalPerson.value) {
        const payload = {
          email: email.value,
          legal_name: legalName.value,
          cnpj: cnpj.value,
          birth_opened: birthOpened.value,
          legal_phone: phoneLegal.value,
          password: password.value,
        };

        const response = await handleRegisterLegal(payload);
        if (response) {
          window.alert(response.message);
          await handleGetRegister();
          isLoading.value = false;
        }
      } else {
        const payload = {
          email: email.value,
          social_name: socialName.value,
          cpf: cpf.value,
          birth_date: birthDate.value,
          social_phone: phoneSocial.value,
          password: password.value,
        };
        const response = await handleRegisterSocial(payload);
        if (response) {
          window.alert(response.message);
          await handleGetRegister();
          isLoading.value = false;
        }
      }
    } catch {
      isLoading.value = false;
      window.alert('Erro ao efetuar cadastro. Tente novamente');
    }
  }, 2000);

  setTimeout(() => {
    localStorage.clear();
    emit('stepChange');
  }, 2500);
};
</script>

<template>
  <main class="main-container">
    <form @submit.prevent="onSubmit">
      <HeaderComponent :step="4" title="Revise suas informações" />
      <div class="step-four-container">
        <InputComponent
          label="Endereço de e-mail"
          type="text"
          id="email"
          @input="(event) => handleInputChange(event, 'email')"
          :value="email"
          alertMessage="Precisamos de um e-mail."
          :hasAlert="isEmailValid"
        />
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
          :alertMessage="
            isLegalPerson
              ? 'Precisamos da razão social.'
              : 'Precisamos de um nome.'
          "
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
          :alertMessage="
            isLegalPerson ? 'Precisamos de um CNPJ.' : 'Precisamos de um CPF.'
          "
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
          :alertMessage="
            isLegalPerson
              ? 'Precisamos da data de abertura da empresa.'
              : 'Precisamos da data de nascimento.'
          "
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
          :alertMessage="
            isLegalPerson
              ? 'Precisamos do telefone da empresa.'
              : 'Precisamos do telefone.'
          "
          :hasAlert="isLegalPerson ? isPhoneLegalValid : isPhoneSocialValid"
        />
        <InputComponent
          label="Sua senha"
          type="text"
          id="password"
          @input="(event) => handleInputChange(event, 'password')"
          :value="password"
          alertMessage="Precisamos de uma senha."
          :hasAlert="isPasswordValid"
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
          :label="isLoading ? '' : 'Cadastrar'"
          variant="primary"
          type="submit"
        >
          <ButtonSpinnerComponent v-if="isLoading" />
        </ButtonComponent>
      </div>
    </form>
  </main>
</template>

<style scoped>
.step-four-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
