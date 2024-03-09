<script setup lang="js">
import SpanComponent from './SpanComponent.vue';

defineProps({
  label: String,
  type: String,
  required: Boolean,
  id:String,
  onchange: Function,
  value: String | Number,
  checked: Boolean,
  hasAlert:Boolean,
  alertMessage: String
})

const handleChange = (event) => {
  console.log("Valor")
  const newValue = event.target.value;
  onchange(newValue);
};

const handleCheckedChange = (event) => {
  console.log("Checked")
  const isChecked = event.target.checked;
  onchange(isChecked);
};

</script>

<template>
  <div
    :class="
      type === 'checkbox' ? 'input-checkbox-container' : 'input-container'
    "
  >
    <label :for="id">{{ label }}</label>
    <input
      :checked="checked"
      :value="value"
      :id="id"
      :type="type"
      :required="required"
      :class="type === 'checkbox' ? 'checkbox-input' : 'input'"
      @change="type === 'checkbox' ? handleCheckedChange : handleChange"
      autocomplete="off"
    />
    <SpanComponent v-if="hasAlert" :message="alertMessage" />
  </div>
</template>

<style scoped>
.input-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: start;
}
.input-checkbox-container {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin: 0;
  gap: 10px;
  width: 100%;
}

.input {
  height: 30px;
  outline: none;
  border-radius: 5px;
  padding: 0 2px;
  width: 98%;
}
.checkbox-input {
  height: 15px;
  outline: none;
  border-radius: 100%;
  width: 20px;
}
</style>
