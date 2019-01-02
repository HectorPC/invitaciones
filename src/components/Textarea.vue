<template>
    <div>
        <div class="form__group">
            <textarea id="description" class="form__field" placeholder="Descripción" rows="6" @blur="validation" v-model="inputValue" :class="{'error-mark': isFormError}"></textarea>
            <label for="message" class="form__label">Descripción</label>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Textarea',
        data() {
            return {
                inputValue: '',
                isFormError: false
            }
        },
        methods: {
          validation() {
            var isValid = true;
            if (this.inputValue == '') {
                isValid = false;
            }
              isValid ? this.isFormError = false : this.isFormError = true;
          }
        },
            watch: {
                isError() {
                    this.isFormError = this.isError;
                    this.validation();
                    return this.isFormError;
                }
            }
    
    }
</script>

<style lang="scss" scoped>

.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 1px solid #d2d2d2;
  outline: 0;
  font-size: 16px;
  color: #212121;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.form__field::placeholder {
  color: transparent;
}

.form__field:placeholder-shown ~ .form__label {
  font-size: 16px;
  cursor: text;
  top: 20px;
}

label,
.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 12px;
  color: #9b9b9b;
}

.form__field:focus ~ .form__label {
  color: #202020;
}

.form__field:focus {
  padding-bottom: 6px;
  border-bottom: 2px solid #202020;
}

.error-text {
    color: #dd2c00;
    font-size: 0.65em;
    font-weight: 500;
    float: left;
}
</style>