<script setup>
import { ref } from 'vue';
import FormStepOneView from './components/views/FormStepOneView.vue';
import FormStepTwoView from './components/views/FormStepTwoView.vue';
import FormStepThreeView from './components/views/FormStepThreeView.vue';
import FormStepFourView from './components/views/FormStepFourView.vue';

const steps = ref({
  stepOne: true,
  stepTwo: false,
  stepThree: false,
  stepFour: false,
});

const handleStepChange = (step) => {
  switch (step) {
    case 1:
      steps.value = {
        stepOne: true,
        stepTwo: false,
        stepThree: false,
        stepFour: false,
      };
      break;
    case 2:
      steps.value = {
        stepOne: false,
        stepTwo: true,
        stepThree: false,
        stepFour: false,
      };
      break;
    case 3:
      steps.value = {
        stepOne: false,
        stepTwo: false,
        stepThree: true,
        stepFour: false,
      };
      break;
    case 4:
      steps.value = {
        stepOne: false,
        stepTwo: false,
        stepThree: false,
        stepFour: true,
      };
      break;
    default:
      break;
  }
};
</script>

<template>
  <main class="main-wrapper">
    <FormStepOneView
      v-if="steps.stepOne === true"
      @stepChange="handleStepChange(2)"
    />
    <FormStepTwoView
      v-if="steps.stepTwo === true"
      @stepChange="handleStepChange(3)"
      @stepChangeBack="handleStepChange(1)"
    />
    <FormStepThreeView
      v-if="steps.stepThree === true"
      @stepChange="handleStepChange(4)"
      @stepChangeBack="handleStepChange(2)"
    />
    <FormStepFourView
      v-if="steps.stepFour === true"
      :is-legal-person="false"
      @stepChangeBack="handleStepChange(3)"
    />
  </main>
</template>

<style scoped>

</style>
