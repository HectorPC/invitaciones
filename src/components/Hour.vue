<template>
        <div id="inputText" class="group" :type="type">
            <input type="time" :id="idHour" :name="name" @blur="validation" @focus="persistError" v-model="inputValue" :class="{'error-mark': isFormError}">
            <span class="bar">
                <span v-if="isFormError" class="error-text">{{ label }} no insertada</span>
            </span>
            <label :label="label">{{ label }}</label>
        </div>
    </template>
    
    <script>
export default {
  name: "Hour",
  props: {
    label: { default: "", type: String },
    type: { default: "", type: String },
    idHour: { default: "", type: String },
    name: { default: "", type: String },
    isError: { default: false, type: Boolean }
  },
  data() {
    return {
      inputValue: "",
      isFormError: false
    };
  },
  methods: {
    validation() {
      var isValid = true;
      if (this.inputValue == "") {
        isValid = false;
      }
      isValid ? (this.isFormError = false) : (this.isFormError = true);
    },
    persistError() {
      if (this.isFormError == true) {
        this.isFormError = true;
      }
    }
  },
  watch: {
    isError() {
      this.isFormError = this.isError;
      this.validation();
      return this.isFormError;
    }
  }
};
</script>
    
    <style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.group {
  position: relative;
  margin-bottom: 45px;
  z-index: 1;
}

input {
  opacity: 0.4;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid #757575;
  &.error-mark {
    border-bottom: 2px solid #dd2c00;
  }
  &:focus {
    outline: none;
  }
  &:focus ~ label,
  &:valid ~ label {
    top: -20px;
    font-size: 14px;
    color: #202020;
  }
  &:focus ~ .bar:before,
  &:focus ~ .bar:after {
    width: 50%;
  }
}

label {
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.bar {
  position: relative;
  display: block;
  width: 100%;
  &:before,
  &:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #202020;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  &:before {
    left: 50%;
  }
  &:after {
    right: 50%;
  }
}

.error-text {
  color: #dd2c00;
  font-size: 0.65em;
  font-weight: 500;
  float: left;
}

// input[type="date"]::-webkit-calendar-picker-indicator {
//      color: rgba(0, 0, 0, 0);
//     opacity: 1;
//     display: block;
//     background: url(../assets/img/calendar.jpg) no-repeat;
//     background-size: 20px 20px;
//     width: 20px;
//     height: 20px;

//     border-width: thin;
// }

// input[type="date"]::-webkit-inner-spin-button {
//   -webkit-appearance: none;
//   display: none;
// }
</style>