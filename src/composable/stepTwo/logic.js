import { ref } from 'vue';

const stepTwoLogic = () => {
  const isLegalPerson = ref(false);
  const isNormalPerson = ref(false);
  const legalName = ref('');
  const socialName = ref('');
  const cpf = ref('');
  const cnpj = ref('');
  const birthDate = ref('');
  const birthOpened = ref('');
  const phoneLegal = ref('');
  const phoneSocial = ref('');

  const isLegalNameValid = ref(false);
  const isSocialNameValid = ref(false);
  const isCpfValid = ref(false);
  const isCnpjValid = ref(false);
  const isBirthDateValid = ref(false);
  const isBirthOpenedValid = ref(false);
  const isPhoneLegalValid = ref(false);
  const isPhoneSocialValid = ref(false);

  const inputMappings = {
    legalName: legalName,
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
  };
};

export {stepTwoLogic}
