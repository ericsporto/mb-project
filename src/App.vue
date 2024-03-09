<script setup>
import FormStepOneView from '@/components/views/FormStepOneView.vue';
import FormStepTwoView from '@/components/views/FormStepTwoView.vue';
import FormStepThreeView from '@/components/views/FormStepThreeView.vue';
import FormStepFourView from '@/components/views/FormStepFourView.vue';
import {handleStepChange} from '@/utils/hacks'
const {stepChange, steps} = handleStepChange()
</script>

<template>
  <main class="main-wrapper">
    <FormStepOneView
      v-if="steps.stepOne === true"
      @stepChange="stepChange(2)"
    />
    <FormStepTwoView
      v-if="steps.stepTwo === true"
      @stepChange="stepChange(3)"
      @stepChangeBack="stepChange(1)"
    />
    <FormStepThreeView
      v-if="steps.stepThree === true"
      @stepChange="stepChange(4)"
      @stepChangeBack="stepChange(2)"
    />
    <FormStepFourView
      v-if="steps.stepFour === true"
      :is-legal-person="false"
      @stepChangeBack="stepChange(3)"
      @stepChange="stepChange(1)"
    />
  </main>
</template>

<style scoped>

</style>
