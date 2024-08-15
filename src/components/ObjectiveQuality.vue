<template>
  <div>
    <label>{{ this.quality }}:</label>
    <div v-for="option in options" :key="option">
      <input
        type="radio"
        :id="id + option"
        :value="option"
        v-model="inputValue"
      />
      <label :for="id + option">
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "options", "quality"],
  data() {
    return {
      inputValue: "",
    };
  },
  watch: {
    inputValue(newVal) {
      this.$emit('update:modelValue', newVal);  // Emit the updated value to the parent
    },
  },
  methods: {
    get() {
      console.log(this.inputValue);
      return this.inputValue;
    },
    set(value) {
        this.$emit('update:modelValue', value);  // Emit the updated value to the parent
      }
  },
};
</script>

<style></style>
