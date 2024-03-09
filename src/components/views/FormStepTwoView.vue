<script setup lang="js">
import {onBeforeMount} from 'vue'
import ButtonComponent from '../ButtonComponent.vue';
import HeaderComponent from '../HeaderComponent.vue';
import InputComponent from '../InputComponent.vue';
import {stepTwoLogic} from '../../composable/stepTwo/logic'

const {handleInputChange,
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
    isPhoneSocialValid} = stepTwoLogic()

const emit = defineEmits(['stepChange', 'stepChangeBack']);

onBeforeMount(() => {
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
  localStorage.setItem('legalName', legalName.value)
  localStorage.setItem('cnpj', cnpj.value)
  localStorage.setItem('birthOpened', birthOpened.value)
  localStorage.setItem('phoneLegal', phoneLegal.value)
  emit('stepChange');
};

const onSubmitNormal = async () => {
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

  localStorage.setItem('socialName', socialName.value)
  localStorage.setItem('cpf', cpf.value)
  localStorage.setItem('birthDate', birthDate.value)
  localStorage.setItem('phoneSocial', phoneSocial.value)
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
          :required="false"
          :id="isLegalPerson ? 'legalName' : 'socialName'"
          @input="
            (event) =>
              handleInputChange(event, isLegalPerson ? 'legalName' : 'socialName')
          "
          :value="isLegalPerson ? legalName : socialName"
          alertMessage="This field is required."
          :hasAlert="isLegalPerson ? isLegalNameValid : isSocialNameValid"
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
