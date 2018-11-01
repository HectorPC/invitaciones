<template>
        <div id="inputText" class="group" :type="type">
            <input type="text" :id="id" :name="name" required @blur="validation(type)" @focus="persistError" v-model="inputValue" :class="{'error-mark': isFormError}">
            <span class="bar">
                <span v-if="isFormError" class="error-text">Invalid {{ label }}</span>
            </span>
            <label :label="label">{{ label }}</label>
        </div>
    </template>
    
    <script>
        export default {
            name: 'InputText',
            props: {
                label: {default: '', type: String},
                type: {default: '', type: String},
                id: {default: '', type: String},
                name: {default: '', type: String},
                isError: {default: false, type: Boolean}
            },
            data() {
                return {
                    inputValue: '',
                    isFormError: false
                }
            },
            methods: {
                validation(type) {
                    var isValid = false;
                    if (type === 'email' && this.inputValue !== '') {
                        var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        isValid = email.test(String(this.inputValue).toLowerCase());
                    } else if (type === 'tel' && this.inputValue !== '') {
                        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                        isValid = phoneno.test(this.inputValue);
                    } else if (this.isFormError == true && this.inputValue === ''){
                        isValid = false;
                    } else {
                        isValid = true;
                    }
                     isValid ? this.isFormError = false : this.isFormError = true;
                },
                persistError() {
                    if(this.isFormError == true) {
                        this.isFormError = true;
                    }
                }
            },
            watch: {
                isError() {
                    this.isFormError = this.isError;
                    this.validation(this.type);
                    return this.isFormError;
                }
            }
        }
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
            &:focus~label,
            &:valid~label {
                top: -20px;
                font-size: 14px;
                color: #202020;
            }
            &:focus~.bar:before,
            &:focus~.bar:after {
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
                content: '';
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
    
    </style>