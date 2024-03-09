import { ref } from 'vue';

const stepOneLogic = () => {
  const email = ref('');
  const normalPersonChecked = ref(false);
  const legalPersonChecked = ref(false);
  const isEmailValid = ref(false);
  const isCheckboxValid = ref(false);

  const handleInputChange = (event) => {
    email.value = event.target.value;
  };

  const handleCheckboxChange = (type) => {
    if (type === 'normal') {
      normalPersonChecked.value = true;
      legalPersonChecked.value = false;
    } else if (type === 'legal') {
      legalPersonChecked.value = true;
      normalPersonChecked.value = false;
    }
  };

  return {
    handleInputChange,
    handleCheckboxChange,
    email,
    isEmailValid,
    normalPersonChecked,
    legalPersonChecked,
    isCheckboxValid,
  };
};

export {stepOneLogic}
