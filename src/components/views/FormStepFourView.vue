<script setup lang="js">
import {onBeforeMount} from 'vue'
import ButtonComponent from '@/components/ButtonComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import ButtonSpinnerComponent from '@/components/ButtonSpinnerComponent.vue'
import {stepFourLogic} from '../../composable/stepFour/logic'
import handleRegister from '@/requests/register'
import handleGetRegister from '@/requests/getRegister'

const {handleInputChange,
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
    isLoading,} = stepFourLogic()

const emit = defineEmits(['stepChange', 'stepChangeBack']);

onBeforeMount(() => {
  password.value = localStorage.getItem('password') || ''
  email.value = localStorage.getItem('email') || ''
  legalName.value = localStorage.getItem('legalName') || ''
  socialName.value = localStorage.getItem('socialName') || ''
  cpf.value = localStorage.getItem('cpf') || ''
  cnpj.value = localStorage.getItem('cnpj') || ''
  birthDate.value = localStorage.getItem('birthDate') || ''
  birthOpened.value = localStorage.getItem('birthOpened') || ''
  phoneSocial.value = localStorage.getItem('phoneSocial') || ''
  phoneLegal.value = localStorage.getItem('phoneLegal') || ''
const isLegal = localStorage.getItem('isLegalPerson')
if(isLegal === 'false'){
  isLegalPerson.value = false
  isNormalPerson.value = true
} else {
  isLegalPerson.value = true
  isNormalPerson.value = false
}
});

const onSubmitLegal = async () => {
  if (!email.value) {
    isEmailValid.value = true;
    return;
  }
  if (!password.value) {
    isPasswordValid.value = true;
    return;
  }
    if (!legalName.value) {
      isLegalNameValid.value = true;
      return;
    }
    if (!cnpj.value) {
      isCnpjValid.value = true;
      return;
    }
    if (!birthOpened.value) {
      isBirthOpenedValid.value = true;
      return;
    }
    if(!phoneLegal.value){
      isPhoneLegalValid.value = true
      return
    }
    isLoading.value = true
    isLoading.value = true
    try{
      const payload = {
        email: email.value,
        legal_name: legalName.value,
        cnpj: cnpj.value,
        birth_opened: birthOpened.value,
        legal_phone: phoneLegal.value,
        password: password.value,
        is_legal: true
      };

        const response = await handleRegister(payload);
        if(response){
          await handleGetRegister()
          isLoading.value = false
          localStorage.clear()
          emit('stepChange')
        }
      }catch{
        isLoading.value = false
        window.alert('Erro ao efetuar cadastro. Tente novamente')
        }
};

const onSubmitNormal = async () => {
  if (!email.value) {
    isEmailValid.value = true;
    return;
  }
  if (!password.value) {
    isPasswordValid.value = true;
    return;
  }
    if (!socialName.value) {
      isSocialNameValid.value = true;
      return;
    }
    if (!cpf.value) {
      isCpfValid.value = true;
      return;
    }
    if (!birthDate.value) {
      isBirthDateValid.value = true;
      return;
    }
    if(!phoneSocial.value){
    isPhoneSocialValid.value = true
    return
  }
  isLoading.value = true
  try{
      const payload = {
        email: email.value,
        social_name: socialName.value,
        cpf: cpf.value,
        birth_date: birthDate.value,
        social_phone: phoneSocial.value,
        password: password.value
      };
        const response = await handleRegister(payload);
        if(response){
          window.alert(response.message)
          await handleGetRegister()
          isLoading.value = false
          localStorage.clear()
          emit('stepChange')
        }
      }catch(error){
        isLoading.value = false
        window.alert('Erro ao efetuar cadastro. Tente novamente')
        }
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
          :required="false"
          id="email"
          @input="(event) => handleInputChange(event, 'email')"
          :value="email"
          alertMessage="This field is required."
          :hasAlert="isEmailValid"
        />
        <InputComponent
          :label="isLegalPerson ? 'Razão social' : 'Nome'"
          type="text"
          :required="false"
          :id="isLegalPerson ? 'legalName' : 'socialName'"
          @input="
            (event) =>
              handleInputChange(event, isLegalPerson ? 'legalName' : 'socialName')
          "
          :value="isLegalPerson ? legalName : socialName"
          alertMessage="This field is required."
          :hasAlert="isLegalPerson ? isSocialNameValid : isLegalNameValid"
        />
        <InputComponent
          :label="isLegalPerson ? 'CNPJ' : 'CPF'"
          type="number"
          :required="false"
          id="cnpj-cpf"
          @input="
            (event) => handleInputChange(event, isLegalPerson ? 'cnpj' : 'cpf')
          "
          :value="isLegalPerson ? cnpj : cpf"
          alertMessage="This field is required."
          :hasAlert="isLegalPerson ? isCnpjValid : isCpfValid"
        />
        <InputComponent
          :label="isLegalPerson ? 'Data de abertura' : 'Data de nascimento'"
          type="date"
          :required="false"
          id="date"
          @input="
            (event) =>
              handleInputChange(
                event,
                isLegalPerson ? 'birthOpened' : 'birthDate'
              )
          "
          :value="isLegalPerson ? birthOpened : birthDate"
          alertMessage="This field is required."
          :hasAlert="isLegalPerson ? isBirthOpenedValid : isBirthDateValid"
        />
        <InputComponent
          label="Telefone"
          type="number"
          :required="false"
          id="phone"
          @input="
            (event) =>
              handleInputChange(
                event,
                isLegalPerson ? 'phoneLegal' : 'phoneSocial'
              )
          "
          :value="isLegalPerson ? phoneLegal : phoneSocial"
          alertMessage="This field is required."
          :hasAlert="isLegalPerson ? isPhoneLegalValid : isPhoneSocialValid"
        />
        <InputComponent
          label="Sua senha"
          type="text"
          :required="false"
          id="password"
          @input="(event) => handleInputChange(event, 'password')"
          :value="email"
          alertMessage="This field is required."
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
          @click="isLegalPerson ? onSubmitLegal() : onSubmitNormal()"
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
