import { ref } from 'vue';

const stepTwoLogic = () => {
  const isLegalPerson = ref(false);
  const isNormalPerson = ref(false);
  const name = ref('');
  const socialName = ref('');
  const cpf = ref('');
  const cnpj = ref('');
  const birthDate = ref('');
  const birthOpened = ref('');
  const phoneLegal = ref('');
  const phoneSocial = ref('');

  const isNameValid = ref(false);
  const isSocialNameValid = ref(false);
  const isCpfValid = ref(false);
  const isCnpjValid = ref(false);
  const isBirthDateValid = ref(false);
  const isBirthOpenedValid = ref(false);
  const isPhoneLegalValid = ref(false);
  const isPhoneSocialValid = ref(false);

  const inputMappings = {
    name: name,
    socialName: socialName,
    cpf: cpf,
    cnpj: cnpj,
    birthDate: birthDate,
    birthOpened: birthOpened,
    phoneSocial: phoneSocial,
    phoneLegal: phoneLegal,
  };

  const handleInputChange = (event, fieldName) => {
    const targetValue = event.target.value;
    const targetConstant = inputMappings[fieldName];
    if (targetConstant) {
      targetConstant.value = targetValue;
    }
  };

  return {
    handleInputChange,
    isLegalPerson,
    isNormalPerson,
    name,
    socialName,
    cpf,
    cnpj,
    birthDate,
    birthOpened,
    phoneLegal,
    phoneSocial,
    isNameValid,
    isSocialNameValid,
    isCpfValid,
    isCnpjValid,
    isBirthDateValid,
    isBirthOpenedValid,
    isPhoneLegalValid,
    isPhoneSocialValid,
  };
};

export {stepTwoLogic}
