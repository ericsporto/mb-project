import { ref } from 'vue';

const stepFourLogic = () => {
    const isLegalPerson = ref(false)
    const isNormalPerson = ref(false)
    const email = ref('');
    const password = ref('')
    const legalName = ref('');
    const socialName = ref('');
    const cpf = ref('');
    const cnpj = ref('');
    const birthDate = ref('');
    const birthOpened = ref('');
    const phoneLegal = ref('');
    const phoneSocial = ref('');
    const isLoading = ref(false)

    const isLegalNameValid = ref(false);
    const isSocialNameValid = ref(false);
    const isCpfValid = ref(false);
    const isCnpjValid = ref(false);
    const isBirthDateValid = ref(false);
    const isBirthOpenedValid = ref(false);
    const isPhoneLegalValid = ref(false);
    const isPhoneSocialValid = ref(false);
    const isPasswordValid = ref(false)
    const isEmailValid = ref(false);

    const inputMappings = {
        email:email,
        password:password,
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
    email,
    password,
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
    isPasswordValid,
    isEmailValid,
    isLoading,
  };
};

export {stepFourLogic}
